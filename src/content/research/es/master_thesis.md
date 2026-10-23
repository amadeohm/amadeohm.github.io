---
lang: "es"
slug: "predig"
title: "On probabilistic prediction and information-theoretic operators"
titleLang: "en"
subtitle: "Tracing Shannon’s footprints across self-supervised learning"
description: "¿Podemos identificar qué observaciones reducirán la incertidumbre predictiva antes de incorporarlas al modelo? Un estudio de la ganancia de información predictiva en regresión lineal bayesiana y análisis probabilístico de componentes principales."
pageDescription: "Trabajo de fin de máster sobre la valoración de observaciones y tareas de predicción enmascarada mediante predictive information gain (PREDIG), estudiado en regresión lineal bayesiana y análisis probabilístico de componentes principales."
author: "Amadeu Huerta Moncho"
supervisor: "Pablo Moreno-Muñoz"
supervisorUrl: "https://pmorenoz.github.io/"
institution: "Universitat Pompeu Fabra"
programme: "Master in Intelligent Interactive Systems"
year: 2026
pdf: "/documents/master-thesis.pdf"
---

## Pregunta

El preentrenamiento con enmascaramiento aprende prediciendo repetidamente partes ocultas de los datos a partir del contexto observado. Pero ¿son todas las tareas de predicción enmascarada igual de informativas?

Este trabajo estudia si la reducción de incertidumbre predictiva sobre un objetivo relevante puede utilizarse para distinguir observaciones informativas de observaciones redundantes y, en última instancia, decidir qué datos merece la pena asimilar durante el aprendizaje.

## Enfoque

La tesis estudia **predictive information gain (PREDIG)** como una medida, dependiente del objetivo, de la reducción de incertidumbre predictiva.

En lugar de preguntar cuánto modifica un candidato los parámetros del modelo, PREDIG mide cuánto reduce la incertidumbre sobre un objetivo predictivo observable al condicionar el modelo en ese candidato. En predicción enmascarada, esto consiste en comparar la incertidumbre sobre las variables ocultas antes y después de observar contexto adicional.

La idea se estudia primero en regresión lineal bayesiana, donde las distribuciones predictivas y las cantidades de teoría de la información pueden calcularse de forma analítica, y después en análisis probabilístico de componentes principales (PPCA), donde se aplica a la predicción de regiones ocultas de imágenes mediante distribuciones condicionales gaussianas.

Estos escenarios permiten estudiar PREDIG tanto como medida de redundancia predictiva como base para una política de aceptación y rechazo de datos.

## Resultado

Los experimentos muestran que la información predictiva no se distribuye de manera uniforme entre las observaciones candidatas y las tareas de predicción enmascarada: a medida que avanza el aprendizaje, muchos candidatos aportan muy poca información adicional sobre el objetivo predictivo considerado.

En determinadas configuraciones experimentales, una política de aceptación y rechazo basada en PREDIG permite descartar más del 80 % de las actualizaciones candidatas manteniendo un rendimiento predictivo próximo al obtenido con la asimilación completa.

Estos resultados respaldan el uso de la reducción de incertidumbre predictiva como criterio para identificar redundancia, pero no establecen una tasa de descarte universal ni implican por sí solos una reducción equivalente del tiempo de entrenamiento, los FLOPs o el consumo energético.