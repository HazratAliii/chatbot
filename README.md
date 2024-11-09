# Project Setup Guide

Follow these steps to clone, set up, and run the project. This guide assumes that you have Python, Node.js, and npm already installed on your system.

## 1. Clone the Repository

First, clone the repository to your local machine using Git:

```bash
git clone https://github.com/HazratAliii/chatbot.git
```

## 2. Navigate to the API Directory

Once the repository is cloned, navigate to the api directory:

```bash
cd api
```

## 3. Create a Virtual Environment

Next, create a Python virtual environment inside the api directory:

```bash
python -m venv env
```

## 4. Install Required Packages

Activate the virtual environment:

- On windows:

```
.\env\Scripts\activate
```

- On macOS/linux:

```
source env/bin/activate
```

After activating the virtual environment, install all the required dependencies from the requirements.txt file:

```
pip install -r requirements.txt

```

## 5. Create the config.py file

In the api directory, create a new file named config.py.

```
touch config.py
```

## 6. Copy Keys from config.example.txt to config.py

Copy all the keys from the config.example.txt file and paste them into the config.py file. Make sure to replace the placeholder values with the actual values for your configuration keys.

```
cp config.example.txt config.py
```

This will start the API server at http://localhost:8000

## 7. Run the API

Now, run the FastAPI app using uvicorn:

```
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

## 8. Open Another Terminal Window

Now, open a new terminal window to work on the frontend.

## 9. Navigate to the Chat-UI Folder

In the new terminal window, navigate to the chat-ui folder:

```
cd chat-ui
```

## 10. Install Frontend Packages

Install the required packages for the frontend using npm:

```
npm install
```

## 11. Create the .env File

In the chat-ui folder, create a .env file:

```
touch .env
```

## 12. Paste Keys from .env.example and Set Values

Copy the keys from the .env.example file and paste them into the newly created .env file. Replace the placeholder values with the actual values.

```
cp .env.example .env
```

## 13. Run the Frontend

Start the frontend development server with the following command:

```
npm run dev
```

## 14. Visit the Application

Visit the application in your browser by going to

```
http://localhost:5173
```
