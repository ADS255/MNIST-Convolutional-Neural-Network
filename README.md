# MNIST Digit Recognition using Convolutional Neural Network (CNN)

This project implements a Convolutional Neural Network (CNN) to recognize handwritten digits from the MNIST dataset.

## Overview

The MNIST dataset is a popular benchmark dataset for machine learning, consisting of 28x28 pixel grayscale images of handwritten digits (0-9). The goal of this project is to develop a CNN model capable of accurately classifying these digits.

## Results

The model achieved an accuracy of **99.21%** on the MNIST test dataset, demonstrating its effectiveness in recognizing handwritten digits.

## Model Architecture

The CNN model used in this project consists of the following layers:

- Two convolutional layers with ReLU activation functions
- After each are max-pooling layers for spatial downsampling
- A flatten layer to convert the 2D feature maps into a 1D vector
- A dense layer with ReLu activation function
- A dense layer with softmax activation for classification

## Training

The model was trained for 64 epochs using the MNIST dataset. Each epoch represents one complete pass through the entire training dataset.

## Dependencies

- Python 3
- TensorFlow 2.x
