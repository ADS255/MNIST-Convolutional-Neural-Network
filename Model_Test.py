from keras.datasets import mnist
import tensorflow as tf
import numpy as np
import matplotlib.pyplot as plt

def TestModel():
    (train_X, train_y), (test_X, test_y) = mnist.load_data()

    test_X = tf.keras.utils.normalize(test_X,axis = 1)

    model = tf.keras.models.load_model('MNIST')
    loss, accuracy = model.evaluate(test_X,test_y)

    print("RESULTS --------------------------------------------------")
    print(loss)
    print(accuracy)

TestModel()
