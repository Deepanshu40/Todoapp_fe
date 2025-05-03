// src/components/ModifyTodoModal.tsx
import React, { useState, useEffect } from 'react';
import {
  Modal,
  View,
  TextInput,
  Text,
  Pressable,
  StyleSheet
} from 'react-native';

interface Props {
  visible: boolean;
  onClose: () => void;
  onUpdate: (id: string, title: string) => void;
  todo: { id: string; title: string } | null;
}

const ModifyTodoModal = ({ visible, onClose, onUpdate, todo }: Props) => {
  const [title, settitle] = useState('');

  useEffect(() => {
    if (todo) settitle(todo.title);
  }, [todo]);

  const handleUpdate = () => {
    if (title.trim()) {
      onUpdate(todo!.id, title);
      onClose();
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <Text style={styles.title}>Modify Todo</Text>
          <TextInput
            value={title}
            onChangeText={settitle}
            placeholder="Update title..."
            style={styles.input}
          />
          <Pressable onPress={handleUpdate} style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
          </Pressable>
          <Pressable onPress={onClose} style={[styles.button, { backgroundColor: '#aaa' }]}>
            <Text style={styles.buttonText}>Cancel</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default ModifyTodoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 15,
    borderRadius: 4,
    padding: 10,
  },
  button: {
    backgroundColor: 'orange',
    padding: 12,
    borderRadius: 5,
    marginTop: 5
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold'
  }
});
