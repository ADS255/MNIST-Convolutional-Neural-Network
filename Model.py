from keras.datasets import mnist
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

#loading the dataset
(train_X, train_y), (test_X, test_y) = mnist.load_data()

train_X = tf.keras.utils.normalize(train_X,axis = 1)

model = tf.keras.models.Sequential()

model.add(tf.keras.layers.Conv2D(128, (6, 6), activation='relu', input_shape=(28, 28, 1))),
model.add(tf.keras.layers.MaxPooling2D((4, 4),strides =2)),
model.add(tf.keras.layers.Conv2D(64, (3, 3), activation='relu')),
model.add(tf.keras.layers.MaxPooling2D((1, 2),strides =1)),
model.add(tf.keras.layers.Flatten()),
model.add(tf.keras.layers.Dense(64, activation='relu')),
model.add(tf.keras.layers.Dense(10, activation='softmax'))

model.compile(optimizer='adam',loss='sparse_categorical_crossentropy',metrics = ['accuracy'])

model.fit(train_X,train_y,epochs=64)

model.save('Trained_Model')