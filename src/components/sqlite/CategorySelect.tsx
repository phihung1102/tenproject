import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Category } from './database'

type Props = {
    categories: Category[];
    selectedCategoryId: number | null;
    onSelect: (categoryId: number) => void;
}

const CategorySelect: React.FC<Props> = ({ categories, selectedCategoryId, onSelect }) => {
  return (
    <View style={styles.container}>
      {categories.map((item) => (
        <TouchableOpacity
            key={item.id}
            style={[
                styles.categoryButton,
                selectedCategoryId === item.id && styles.selectedButton,
            ]}
            onPress={() => onSelect(item.id)}
        >
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  )
}

export default CategorySelect

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    categoryButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: '#ddd',
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },
    selectedButton: {
        backgroundColor: '#007bff',
    },
    categoryText: {
        color: '#333',
        fontWeight: '600',
    },
})