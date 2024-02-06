# Getting Started

To get started with the Livestream Overlays app, follow these simple steps:

1. Clone the app repository by running the following command in your terminal:

   ```bash
   git clone https://www.github.com/melvinjariwala/livestream_app.git

   ```

2. Navigate to the root directory of the app.

   ```bash
   cd livestream_app
   ```

3. Install the required dependencies by running:

   ```bash
   pip install -r requirements.txt
   ```

4. Navigate to frontend and build project by running:

   ```bash
   cd frontend
   npm i
   npm run build
   cd ..
   ```

5. Start the app by running:

   ```bash
   gunicorn -b 0.0.0.0:10000 index:app
   ```

6. Open your web browser and visit [http://localhost:10000](http://localhost:10000/) to use the Livestream Overlays app.

# Quickstart

```bash
   git clone https://www.github.com/melvinjariwala/livestream_app.git
   cd livestream_app
   pip install -r requirements.txt
   cd frontend
   npm i
   npm run build
   cd ..
   gunicorn -b 0.0.0.0:10000 index:app
```

Open your web browser and visit [http://localhost:10000](http://localhost:10000/) to use the Livestream Overlays app.
