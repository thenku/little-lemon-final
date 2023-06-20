import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

const Filters = ({ onChange, selections, sections }) => {
  return (
    <View style={styles.filtersContainer}>
      {sections.map((section, index) => (
        <TouchableOpacity
          onPress={() => {
            onChange(index);
          }}
          key={index}
          style={{
            flex: 1 / sections.length,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 8,
            backgroundColor: selections[index] ? '#495e57' : '#efefef',
            borderWidth: 1,
            borderRadius:16,
          }}>
          <View>
            <Text style={{ color: selections[index] ? 'white' : 'black' }}>
              {section}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 8,
  },
});

export default Filters;
