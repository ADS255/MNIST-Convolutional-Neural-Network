from keras.datasets import mnist
import tensorflow as tf

class Utils:

    (train_X, train_Y), (test_X, test_Y) = mnist.load_data()

    @staticmethod
    def continueTraining(trainAmount):
        Utils.train_X = tf.keras.utils.normalize(Utils.train_X,axis = 1)
        model = tf.keras.models.load_model('Trained_Model')
        model.fit(Utils.train_X,Utils.train_Y,epochs= trainAmount)
        model.save('Trained_Model')

    @staticmethod
    def TestModel():
        Utils.test_X = tf.keras.utils.normalize(Utils.test_X,axis = 1)

        model = tf.keras.models.load_model('Trained_Model')
        loss, accuracy = model.evaluate(Utils.test_X,Utils.test_Y)

        print("RESULTS --------------------------------------------------")
        print(loss)
        print(accuracy)