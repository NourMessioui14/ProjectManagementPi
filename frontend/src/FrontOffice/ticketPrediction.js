import * as tf from '@tensorflow/tfjs';

// Données d'exemple : descriptions de ticket et étiquettes correspondantes (par exemple, les types de ticket)
const descriptions = ["Problème avec l'authentification de l'utilisateur", "Erreur lors de l'accès au serveur", "Problème de connexion Internet"];
const labels = ["Authentification", "Serveur", "Connexion"];

// Prétraitement des données : tokenisation et vectorisation des descriptions de ticket
const tokenizer = tf.tokenization.textTokenizer();
const sequences = tokenizer.textsToSequences(descriptions);
const paddedSequences = tf.keras.preprocessing.sequence.padSequences(sequences);

// Définition du modèle
const model = tf.sequential();
model.add(tf.layers.embedding({inputDim: vocabSize, outputDim: embeddingSize, inputLength: maxLength}));
model.add(tf.layers.flatten());
model.add(tf.layers.dense({units: 64, activation: 'relu'}));
model.add(tf.layers.dense({units: labels.length, activation: 'softmax'}));

// Compilation du modèle
model.compile({optimizer: 'adam', loss: 'sparseCategoricalCrossentropy', metrics: ['accuracy']});

// Entraînement du modèle
const epochs = 10;
const batchSize = 32;
model.fit(paddedSequences, labels, {epochs, batchSize})
  .then(() => {
    console.log('Entraînement terminé');
    
    // Utilisation du modèle pour prédire les tickets à partir de nouvelles descriptions
    const newDescriptions = ["Problème de sécurité détecté", "Erreur lors du traitement des paiements"];
    const newSequences = tokenizer.textsToSequences(newDescriptions);
    const newPaddedSequences = tf.keras.preprocessing.sequence.padSequences(newSequences);
    const predictions = model.predict(newPaddedSequences);

    predictions.print();
  })
  .catch(err => console.error('Erreur d\'entraînement du modèle :', err));
