import { StyleSheet, Text, TextInput, View, TouchableOpacity, ScrollView, Image, Alert, ImageSourcePropType } from 'react-native'
import React, { useState } from 'react'

const Manghs = () => {
    type Students = {
        id: string,
        name: string,
        age: number,
        grade: number,
        image: ImageSourcePropType,
    }

    const [students, setStudents] = React.useState<Students[]>([
        {
            id: '1',
            name: 'Nguyen Phi Hung',
            age: 20,
            grade: 8,
            image: require('../../assets/shop/student.jpg'),
        },
        {
            id: '2',
            name: 'Nguyen Thi Hang',
            age: 19,
            grade: 10,
            image: require('../../assets/shop/student.jpg'),
        },
        {
            id: '3',
            name: 'Nguyen Thi Hang',
            age: 18,
            grade: 9,
            image: require('../../assets/shop/student.jpg'),
        },
        {
            id: '4',
            name: 'Nguyen Thi Hang',
            age: 17,
            grade: 7,
            image: require('../../assets/shop/student.jpg'),
        },
    ]);
    const [studentsArr, setStudentsArr] = React.useState<Students[]>([]);
    const [name, setName] = useState<string>('');
    const [age, setAge] = useState<string>('');
    const [grade, setGrade] = useState<string>('');
    const [editingID, setEditingId] = useState<string | null>('');
    const [activeMenu, setActiveMenu] = useState<'filter' | null>(null);
    const [currentView, setCurrentView] = useState<'main' | 'filter-name' | 'filter-age' | 'filter-grade' | 'sort' | 'calculate'>('main');
    const [filterValue, setFilterValue] = useState<string>('');
    const [sortKey, setSortKey] = useState<'name' | 'age' | 'grade'>('name');
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
    const [sortKeySelected, setSortKeySelected] = useState<'name' | 'age' | 'grade'>('name');
    const [sortDirectionSelected, setSortDirectionSelected] = useState<'asc' | 'desc'>('asc');
    const [calculateKey, setCalculateKey] = useState<'age' | 'grade'>('age');
    const [calculateKeySelected, setCalculateKeySelected] = useState<'age' | 'grade'>('age');
    const [calculateMath, setCalculateMath] = useState<'greater' | 'less' | 'equals'>('greater');
    const [calculateMathSelected, setCalculateMathSelected] = useState<'greater' | 'less' | 'equals'>('greater');

    const handleAdd = () => {
        if(name.trim() === '') {Alert.alert('Lỗi', 'Vui lòng nhập tên!'); return;}
        if(age.trim() === '') {Alert.alert('Lỗi', 'Vui lòng nhập tuổi!'); return;}
        if(grade.trim() === '') {Alert.alert('Lỗi', 'Vui lòng nhập điểm!'); return;}
        const parsedAge = parseInt(age);
        const parseGrade = parseInt(grade);
        if(isNaN(parsedAge) || parsedAge <= 0) {Alert.alert('Lỗi', 'Tuổi sinh viên phải là số nguyên và lớn hơn 0!'); return;}
        if(isNaN(parseGrade) || parseGrade <= 0 || parseGrade > 10) {Alert.alert('Lỗi', 'Điểm sinh viên phải là số nguyên và nằm trong thang điểm từ 1 - 10!'); return;}

        if(editingID){
            const updated = students.map((p) => p.id === editingID ? {...p, name, age: Number(parsedAge), grade: Number(parseGrade)} : p);
            setStudents(updated);
            setEditingId('');
        } else {
            const newStudent: Students = {
                id: (students.length + 1).toString(),
                name,
                age: Number(age),
                grade: Number(grade),
                image: require('../../assets/shop/student.jpg'),
            };
            setStudents([...students, newStudent]);
        }

        setName('');
        setAge('');
        setGrade('')
    };


    const handleEdit = (id:string) => {
        const product = students.find(p => p.id === id);
        if(product){
            setName(product.name);
            setAge(product.age.toString());
            setGrade(product.grade.toString());
            setEditingId(id);
        }
    }

    const handleDelete = (id:string) => {
        setStudents(students.filter(p => p.id !== id));
    }

    const handleFilterName = () => {
        const filtered = students.filter(s => s.name.toLowerCase().includes(filterValue.toLowerCase()));
        setStudentsArr(filtered);
    }

    const handleFilterAge = (condition: 'greater' | 'less' | 'equals') => {
        const value = parseInt(filterValue);
        if(isNaN(value) || value <= 0) { Alert.alert('Lỗi', 'Vui lòng nhập số hợp lệ!'); return; }
        const filtered = students.filter(s => {
            if(condition === 'greater') return s.age > value;
            if(condition === 'less') return s.age < value;
            return s.age === value;
        })
        setStudentsArr(filtered);
    }

     const handleFilterGrade = (condition: 'greater' | 'less' | 'equals') => {
        const value = parseInt(filterValue);
        if(isNaN(value) || value <= 0 || value > 10) { Alert.alert('Lỗi', 'Vui lòng nhập số hợp lệ (1 - 10)!'); return; }
        const filtered = students.filter(s => {
            if(condition === 'greater') return s.grade > value;
            if(condition === 'less') return s.grade < value;
            return s.grade === value;
        })
        setStudentsArr(filtered);
    }

    const handleSort = (key: 'name' | 'age' | 'grade', direction: 'asc' | 'desc') => {
        const sorted = [...students].sort((a, b) => {
            if(key === 'name'){
                return direction === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
            }else{
                return direction === 'asc' ? a[key] - b[key] : b[key] - a[key];
            }
        });
        setStudentsArr(sorted);
    }

    const handleCalculate = (key: 'age' | 'grade', math: 'greater' | 'less' | 'equals') => {
        if (filterValue.trim() === '') {
            Alert.alert('Lỗi', 'Vui lòng nhập giá trị cần tính toán!');
            return;
        }
        const value = parseInt(filterValue);
        if (isNaN(value)) {
            Alert.alert('Lỗi', 'Vui lòng nhập số hợp lệ!');
            return;
        }
        if (key === 'grade' && (value < 1 || value > 10)) {
            Alert.alert('Lỗi', 'Điểm phải từ 1 đến 10!');
            return;
        }
        const filtered = students.filter(s => {
            if (math === 'greater') return s[key] > value;
            if (math === 'less') return s[key] < value;
            return s[key] === value;
        });
        setStudentsArr(filtered);
    }
    
    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            {currentView === 'main' && (
                <>
                <Text style={styles.header}>Quản lý sinh viên</Text>
                <View style={styles.textinput}>
                    <TextInput
                        value={name}
                        onChangeText={(text)=>setName(text)}
                        placeholder='Tên sinh viên'
                        style={styles.input}
                    />
                    <TextInput
                        value={age}
                        onChangeText={(text)=>setAge(text)}
                        keyboardType='numeric'
                        placeholder='Tuổi sinh viên'
                        style={styles.input}
                    />
                    <TextInput
                        value={grade}
                        onChangeText={(text)=>setGrade(text)}
                        keyboardType='numeric'
                        placeholder='Điểm sinh viên'
                        style={styles.input}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleAdd}>
                        <Text style={styles.buttonText}>
                            {editingID ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm'}
                        </Text>
                    </TouchableOpacity>
                    <View style={styles.buttons}>
                        <TouchableOpacity style={styles.buttonC} onPress={() => setActiveMenu(activeMenu === 'filter' ? null : 'filter')}>
                            <Text style={styles.buttonTextC}>Lọc</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonC} onPress={() => setCurrentView('sort')}>
                            <Text style={styles.buttonTextC}>Sắp xếp</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonC} onPress={() => setCurrentView('calculate')}>
                            <Text style={styles.buttonTextC}>Tính toán</Text>
                        </TouchableOpacity>
                        {activeMenu === 'filter' ? (
                            <View style={styles.studentFilter1}>
                                <TouchableOpacity style={styles.buttonStuF} onPress={() => { setCurrentView('filter-name'); setActiveMenu(null); }}>
                                    <Text style={styles.buttonTextStuF}>Lọc theo tên</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonStuF} onPress={() => { setCurrentView('filter-age'); setActiveMenu(null); }}>
                                    <Text style={styles.buttonTextStuF}>Lọc theo tuổi</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.buttonStuF} onPress={() => { setCurrentView('filter-grade'); setActiveMenu(null); }}>
                                    <Text style={styles.buttonTextStuF}>Lọc theo điểm</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null}
                    </View>
                </View>

                <View style={styles.students}>
                    {students.map((student) => (
                        <View key={student.id} style={styles.studentCard}>
                            <Image style={styles.image} source={student.image}/>
                            <View style={styles.info}>
                                <Text style={styles.text}>{student.name}</Text>
                                <Text style={styles.text}>{student.age} tuổi</Text>
                                <Text style={styles.text}>{student.grade} điểm</Text>
                                <View style={styles.icon}>
                                    <TouchableOpacity onPress={() => handleDelete(student.id)}>
                                        <Text style={styles.text}>✖️</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleEdit(student.id)}>
                                        <Text style={styles.text}>✏️</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
                </>
            )
        }
            {currentView === 'filter-name' && (
                <View style={styles.ctn}>
                    <TouchableOpacity onPress={() => { setCurrentView('main'); setStudentsArr([]); setFilterValue('')}}>
                        <Text style={styles.text}>✖️</Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>Lọc theo tên</Text>
                    <TextInput
                        value={filterValue}
                        onChangeText={(text) => setFilterValue(text)}
                        style={styles.input}
                        placeholder='Nhập tên muốn lọc'
                    />
                    <TouchableOpacity style={styles.button} onPress={handleFilterName}>
                        <Text style={styles.buttonText}>Lọc</Text>
                    </TouchableOpacity>
                    <View style={styles.students}>
                        {studentsArr.map((student) => (
                            <View key={student.id} style={styles.studentCard}>
                                <Image style={styles.image} source={student.image}/>
                                <View style={styles.info}>
                                    <Text style={styles.text}>{student.name}</Text>
                                    <Text style={styles.text}>{student.age} tuổi</Text>
                                    <Text style={styles.text}>{student.grade} điểm</Text>
                                    <View style={styles.icon}>
                                        <TouchableOpacity onPress={() => handleDelete(student.id)}>
                                            <Text style={styles.text}>✖️</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleEdit(student.id)}>
                                            <Text style={styles.text}>✏️</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}
            {currentView === 'filter-age' && (
                <View style={styles.ctn}>
                    <TouchableOpacity onPress={() => { setCurrentView('main'); setStudentsArr([]); setFilterValue('')}}>
                        <Text style={styles.text}>✖️</Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>Lọc theo tuổi</Text>
                    <TextInput
                        value={filterValue}
                        onChangeText={(text) => setFilterValue(text)}
                        style={styles.input}
                        placeholder='Nhập tuổi'
                        keyboardType='numeric'
                    />
                    <View style={styles.buttonOption}>
                        <TouchableOpacity style={styles.buttonO} onPress={() => handleFilterAge('greater')}>
                            <Text style={styles.buttonText}>lớn hơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonO} onPress={() => handleFilterAge('less')}>
                            <Text style={styles.buttonText}>nhỏ hơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonO} onPress={() => handleFilterAge('equals')}>
                            <Text style={styles.buttonText}>bằng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.students}>
                        {studentsArr.map((student) => (
                            <View key={student.id} style={styles.studentCard}>
                                <Image style={styles.image} source={student.image}/>
                                <View style={styles.info}>
                                    <Text style={styles.text}>{student.name}</Text>
                                    <Text style={styles.text}>{student.age} tuổi</Text>
                                    <Text style={styles.text}>{student.grade} điểm</Text>
                                    <View style={styles.icon}>
                                        <TouchableOpacity onPress={() => handleDelete(student.id)}>
                                            <Text style={styles.text}>✖️</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleEdit(student.id)}>
                                            <Text style={styles.text}>✏️</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}
            {currentView === 'filter-grade' && (
                <View style={styles.ctn}>
                    <TouchableOpacity onPress={() => { setCurrentView('main'); setStudentsArr([]); setFilterValue('')}}>
                        <Text style={styles.text}>✖️</Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>Lọc theo điểm</Text>
                    <TextInput
                        value={filterValue}
                        onChangeText={(text) => setFilterValue(text)}
                        style={styles.input}
                        placeholder='Nhập điểm (1 - 10)'
                        keyboardType='numeric'
                    />
                    <View style={styles.buttonOption}>
                        <TouchableOpacity style={styles.buttonO} onPress={() => handleFilterGrade('greater')}>
                            <Text style={styles.buttonText}>lớn hơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonO} onPress={() => handleFilterGrade('less')}>
                            <Text style={styles.buttonText}>nhỏ hơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonO} onPress={() => handleFilterGrade('equals')}>
                            <Text style={styles.buttonText}>bằng</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.students}>
                        {studentsArr.map((student) => (
                            <View key={student.id} style={styles.studentCard}>
                                <Image style={styles.image} source={student.image}/>
                                <View style={styles.info}>
                                    <Text style={styles.text}>{student.name}</Text>
                                    <Text style={styles.text}>{student.age} tuổi</Text>
                                    <Text style={styles.text}>{student.grade} điểm</Text>
                                    <View style={styles.icon}>
                                        <TouchableOpacity onPress={() => handleDelete(student.id)}>
                                            <Text style={styles.text}>✖️</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleEdit(student.id)}>
                                            <Text style={styles.text}>✏️</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}
            {currentView === 'sort' && (
                <View style={styles.ctn}>
                    <TouchableOpacity onPress={() => { setCurrentView('main'); setStudentsArr([]); setSortKeySelected('name'); setSortDirectionSelected('asc')}}>
                        <Text style={styles.text}>✖️</Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>Sắp xếp</Text>
                    <Text style={styles.title}>Mục tiêu sắp xếp:</Text>
                    <View style={styles.buttonOptionss}>
                        <TouchableOpacity style={[styles.buttonOs, sortKeySelected === 'name' && styles.selectedButton]} onPress={() => {setSortKey('name'); setSortKeySelected('name')}}>
                            <Text style={styles.buttonText}>Tên</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonOs, sortKeySelected === 'age' && styles.selectedButton]} onPress={() => {setSortKey('age'); setSortKeySelected('age')}}>
                            <Text style={styles.buttonText}>Tuổi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonOs, sortKeySelected === 'grade' && styles.selectedButton]} onPress={() => {setSortKey('grade'); setSortKeySelected('grade')}}>
                            <Text style={styles.buttonText}>Điểm</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Hướng sắp xếp:</Text>
                    <View style={styles.buttonOptions}>
                        <TouchableOpacity style={[styles.buttonOs, sortDirectionSelected === 'asc' && styles.selectedButton]} onPress={() => {setSortDirection('asc'); setSortDirectionSelected('asc')}}>
                            <Text style={styles.buttonText}>Tăng dần</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonOs, sortDirectionSelected === 'desc' && styles.selectedButton]}onPress={() => {setSortDirection('desc'); setSortDirectionSelected('desc')}}>
                            <Text style={styles.buttonText}>Giảm dần</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => handleSort(sortKey, sortDirection)}>
                        <Text style={styles.buttonText}>Thực hiện</Text>
                    </TouchableOpacity>
                    <View style={styles.students}>
                        {studentsArr.map((student) => (
                            <View key={student.id} style={styles.studentCard}>
                                <Image style={styles.image} source={student.image}/>
                                <View style={styles.info}>
                                    <Text style={styles.text}>{student.name}</Text>
                                    <Text style={styles.text}>{student.age} tuổi</Text>
                                    <Text style={styles.text}>{student.grade} điểm</Text>
                                    <View style={styles.icon}>
                                        <TouchableOpacity onPress={() => handleDelete(student.id)}>
                                            <Text style={styles.text}>✖️</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleEdit(student.id)}>
                                            <Text style={styles.text}>✏️</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}
            {currentView === 'calculate' && (
                <View style={styles.ctn}>
                    <TouchableOpacity onPress={() => { setCurrentView('main'); setStudentsArr([]); setCalculateKeySelected('age'); setCalculateMathSelected('greater'); setFilterValue('')}}>
                        <Text style={styles.text}>✖️</Text>
                    </TouchableOpacity>
                    <Text style={styles.header}>Tính toán</Text>
                    <Text style={styles.title}>Nhập giá trị:</Text>
                    <TextInput
                        value={filterValue}
                        onChangeText={(text) => setFilterValue(text)}
                        placeholder='Nhập giá trị cần tính toán'
                        style={styles.input}
                        keyboardType='numeric'
                    />
                    <Text style={styles.title}>Tính theo:</Text>
                    <View style={styles.buttonOptionss}>
                        <TouchableOpacity style={[styles.buttonOs, calculateKeySelected === 'age' && styles.selectedButton]} onPress={() => {setCalculateKey('age'); setCalculateKeySelected('age')}}>
                            <Text style={styles.buttonText}>Tuổi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonOs, calculateKeySelected === 'grade' && styles.selectedButton]} onPress={() => {setCalculateKey('grade'); setCalculateKeySelected('grade')}}>
                            <Text style={styles.buttonText}>Điểm</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.title}>Điều kiện:</Text>
                    <View style={styles.buttonOption}>
                        <TouchableOpacity style={[styles.buttonOs, calculateMathSelected === 'greater' && styles.selectedButton]} onPress={() => {setCalculateMath('greater'); setCalculateMathSelected('greater')}}>
                            <Text style={styles.buttonText}>lớn hơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonOs, calculateMathSelected === 'less' && styles.selectedButton]} onPress={() => {setCalculateMath('less'); setCalculateMathSelected('less')}}>
                            <Text style={styles.buttonText}>nhỏ hơn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonOs, calculateMathSelected === 'equals' && styles.selectedButton]} onPress={() => {setCalculateMath('equals'); setCalculateMathSelected('equals')}}>
                            <Text style={styles.buttonText}>bằng</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.button} onPress={() => handleCalculate(calculateKey, calculateMath)}>
                        <Text style={styles.buttonText}>Tính toán</Text>
                    </TouchableOpacity>
                    
                    {studentsArr.length > 0 && (
                        <View style={styles.resultContainer}>
                            <Text style={styles.resultText}>
                                Số sinh viên đủ điều kiện: {studentsArr.length}
                            </Text>
                            <Text style={styles.resultText}>
                                Tỉ lệ: {(studentsArr.length / students.length * 100).toFixed(1)}%
                            </Text>
                        </View>
                    )}
                    
                    <View style={styles.students}>
                        {studentsArr.map((student) => (
                            <View key={student.id} style={styles.studentCard}>
                                <Image style={styles.image} source={student.image}/>
                                <View style={styles.info}>
                                    <Text style={styles.text}>{student.name}</Text>
                                    <Text style={styles.text}>{student.age} tuổi</Text>
                                    <Text style={styles.text}>{student.grade} điểm</Text>
                                    <View style={styles.icon}>
                                        <TouchableOpacity onPress={() => handleDelete(student.id)}>
                                            <Text style={styles.text}>✖️</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => handleEdit(student.id)}>
                                            <Text style={styles.text}>✏️</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))}
                    </View>
                </View>
            )}

            
        </ScrollView>
    );
};

export default Manghs

const styles = StyleSheet.create({
    scrollContainer: {},
    ctn: {
        padding: 10,
    },
    header: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    textinput: {
        padding: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 8,
        padding: 5,
        marginBottom: 10,
        color: 'gray',
    },
    students: {
        padding: 10,
    },
    studentCard: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        padding: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 15,
        marginBottom: 3,
    },
    image: {
        width: 100,
        height: 100,
    },
    info: {
        display: 'flex',
        gap: 5,
    },
    icon: {
        display: 'flex',
        flexDirection: 'row',
        gap: 20,
    },
    text: {
        fontSize: 16,
    },
    button: {
        width: '100%',
        alignSelf: 'center',
        padding: 5,
        backgroundColor: '#3399FF',
        borderRadius: 5,
        marginBottom: 3,
    },
    buttonText: {
        padding: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonC: {
        width: '30%',
        alignSelf: 'center',
        padding: 5,
        backgroundColor: '#3399FF',
        borderRadius: 5,
        position: 'relative',
    },
    buttonTextC: {
        padding: 5,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    studentFilter1: {
        position: 'absolute',
        top: 40,
        left: '5%',
        right: 0,
        width: '40%',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 5,
        zIndex: 999,
        elevation: 5,
    },
    buttonStuF: {
        padding: 5,
        backgroundColor: '#CCFFFF',
        borderRadius: 5,
        margin: 2,
    },
    buttonTextStuF: {
        padding: 5,
        color: 'gray',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    buttonOption: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonO: {
        width: '30%',
        alignSelf: 'center',
        padding: 5,
        backgroundColor: '#3399FF',
        borderRadius: 5,
        position: 'relative',
        marginBottom: 5,
    },
    buttonOptions: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    buttonOptionss: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    buttonOs: {
        width: '30%',
        alignSelf: 'center',
        padding: 5,
        backgroundColor: '#0066CC',
        borderRadius: 5,
        position: 'relative',
        marginBottom: 5,
    },
    selectedButton: {
        backgroundColor: '#004C99',
    },
    title: {
        fontSize: 16,
        margin: 5,
        fontWeight: 'bold',
        color: 'purple',
    },
        resultContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
    resultText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
})