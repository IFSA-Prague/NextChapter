import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, TouchableOpacity } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import DropDownPicker from 'react-native-dropdown-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

const db = getFirestore();

export default function BookclubHomeScreen({ route, navigation }) {
    const [bookClub, setBookClub] = useState(null);
    const [bookData, setBookData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { bookClubId } = route.params || { bookClubId: null }; // if no bookClubId is passed, set it to null
    
    // State for chapter selection
    const [chapterOpen, setChapterOpen] = useState(false);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [chapterItems, setChapterItems] = useState([]);

    useEffect(() => {
        if (bookData?.numChapters) {
          const chapters = Array.from({ length: bookData.numChapters }, (_, i) => ({
            label: `Chapter ${i + 1}`,
            value: `chapter${i + 1}`,
          }));
          setChapterItems(chapters);
        }
      }, [bookData]);
    
    useEffect(() => {
        const fetchBookClubDetails = async () => {
            if (!bookClubId) {
                setLoading(false);
                return;
            }

            try {
                const bookClubRef = doc(db, 'bookclubs', bookClubId);
                const bookClubDoc = await getDoc(bookClubRef);

                if (bookClubDoc.exists()) {
                    const data = { id: bookClubDoc.id, ...bookClubDoc.data() };
                    setBookClub(data);

                    // Fetch the book details using the bookId (book reference)
                    if (data.currentBook) {
                        const bookRef = doc(db, 'books', data.currentBook);
                        const bookDoc = await getDoc(bookRef);

                        if (bookDoc.exists()) {
                            setBookData({ id: bookDoc.id, ...bookDoc.data() });
                        }
                          
                    }
                } else {
                    console.log("No such book club!");
                }
            } catch (error) {
                console.error("Error fetching book club details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBookClubDetails();
    }, [bookClubId]);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#6200ee" />
            </View>
        );
    }

    if (!bookClub) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Book club not found or no ID provided.</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    {bookClub.imageUrl ? (
                        <Image 
                            source={{ uri: bookClub.imageUrl }} 
                            style={styles.clubImage} 
                        />
                    ) : (
                        <View style={styles.placeholderImage}>
                            <Text style={styles.placeholderText}>{bookClub.name?.charAt(0) || "B"}</Text>
                        </View>
                    )}
                    <Text style={styles.clubName}>{bookClub.name}</Text>
                    <Text style={styles.clubDescription}>{bookClub.description}</Text>
                </View>
                
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Current Book</Text>
                    {bookData?.title ? (
                        <TouchableOpacity
                            style={styles.bookContainer}
                            onPress={() => navigation.navigate('BookDetails', { bookId: bookClub.currentBook })}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.bookTitle}>{bookData.title}</Text>
                            {bookData.author && (
                                <Text style={styles.bookAuthor}>by {bookData.author}</Text>
                            )}
                            {bookData.description && (
                                <Text style={styles.bookDescription}>{bookData.description}</Text>
                            )}
                        </TouchableOpacity>
                    ) : (
                        <Text style={styles.noContentText}>No book currently selected</Text>
                    )}
                </View>
                
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Members</Text>
                    <Text style={styles.memberCount}>{bookClub.members?.length || 0} members</Text>
                </View>
        
                <View style={styles.sectionContainer}>
                    <Text style={styles.sectionTitle}>Join Discussion</Text>
                    {bookData?.numChapters ? (
                        <>
                            <Text style={{ marginTop: 10, marginBottom: 4, fontSize: 16 }}>Select Chapter</Text>
                            <DropDownPicker
                                listMode="MODAL"
                                open={chapterOpen}
                                value={selectedChapter}
                                items={chapterItems}
                                setOpen={setChapterOpen}
                                setValue={setSelectedChapter}
                                setItems={setChapterItems}
                                placeholder="Select a chapter..."
                                style={styles.dropdown}
                                dropDownContainerStyle={styles.dropdownContainer}
                            />
                            {selectedChapter && (
                            <TouchableOpacity
                                style={styles.viewDiscussionButton}
                                onPress={() => navigation.navigate('BookclubDiscussionScreen', {
                                bookClubId: bookClub.id,
                                chapter: selectedChapter,
                                bookId: bookData.id,
                                // discussion id will be looked up or created in the next screen
                                })}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.viewDiscussionText}>View Discussion</Text>
                            </TouchableOpacity>
                            )}
                        </>
                    ) : (
                        <Text style={styles.noContentText}>Chapter info unavailable</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f1f0eb',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f1f0eb',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    clubImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 16,
    },
    placeholderImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#6200ee',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    placeholderText: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold',
    },
    clubName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    clubDescription: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
    },
    sectionContainer: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    bookContainer: {
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    bookTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    bookAuthor: {
        fontSize: 14,
        fontStyle: 'italic',
        marginBottom: 8,
        color: '#444',
    },
    bookDescription: {
        fontSize: 14,
        color: '#333',
    },
    noContentText: {
        fontSize: 14,
        color: '#999',
        fontStyle: 'italic',
    },
    memberCount: {
        fontSize: 14,
        color: '#666',
        marginBottom: 8,
    },
    errorText: {
        fontSize: 16,
        color: '#f44336',
        textAlign: 'center',
        marginTop: 40,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 8,
    },
    picker: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 20,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 10,
        borderColor: '#ccc',
    },
    dropdownContainer: {
        backgroundColor: '#fff',
        borderColor: '#ccc',
    },
    viewDiscussionButton: {
        backgroundColor: 'black',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
      },
      viewDiscussionText: {
        color: '#fff',
        fontSize: 16,
      },
});
