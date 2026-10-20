---
lang: es
slug: dental-bone-loss
title: "Vision-based analysis of medical images for assessing bone loss in dental implant patients"
titleLang: en
description: "¿Cómo convertir radiografías dentales en medidas interpretables de pérdida ósea? Un estudio que combina aprendizaje profundo, visión por computador clásica y adaptación a nuevas imágenes guiada por la incertidumbre."
author: Amadeo Huerta Moncho
supervisor: Isiah Zaplana Agut
institution: Universitat Politècnica de Catalunya
programme: Grado en Inteligencia Artificial
year: 2025
pdf: /documents/bachelor-thesis.pdf
---

## Pregunta

Este trabajo estudia cómo pasar de una radiografía periapical a medidas interpretables de la pérdida ósea alrededor de un implante dental. El reto va más allá de detectar el implante: una medida útil también depende de identificar la parte relevante de su estructura y el límite del hueso que lo rodea.

El trabajo conecta la visión por computador y la imagen médica mediante un sistema experimental completo, desde la preparación de imágenes y la comparación de modelos hasta la medición geométrica y la adaptación a nuevos datos.

## Enfoque

Comparé YOLOv8 y Faster R-CNN para detectar implantes, y U-Net y Mask R-CNN para segmentar las imágenes. Junto a estos modelos supervisados, desarrollé un **enfoque híbrido que combina Segment Anything Model (SAM) con visión por computador clásica**. SAM aísla el cuerpo del implante, mientras que la umbralización, la morfología matemática y los gradientes condicionados por la geometría permiten extraer el límite óseo.

Las regiones obtenidas permiten calcular dos medidas complementarias: **pérdida ósea vertical** y **pérdida ósea basada en área**. Así se establece una conexión explícita entre la segmentación de la imagen y la magnitud que se quiere medir.

El desarrollo utilizó un conjunto público de 200 radiografías y una muestra inicial de 25 radiografías de nueve pacientes, facilitada mediante una colaboración con el Hospital Odontològic de la Universitat de Barcelona (HOUB).

## Resultados

En el conjunto de prueba reservado que recoge la memoria, Faster R-CNN alcanzó un AP50 de **0,929** en detección de implantes, frente a **0,849** de YOLOv8s. U-Net obtuvo un Dice de **0,8801** y un IoU de **0,7973** en segmentación. El método híbrido se evaluó por separado por su capacidad para aislar el cuerpo del implante y extraer los contornos necesarios para medir.

La aplicación del modelo de segmentación a imágenes del HOUB reveló un cambio de dominio. Exploré un ciclo de adaptación que selecciona imágenes mediante la entropía predictiva por píxel, genera pseudoetiquetas con el sistema de visión clásica y reajusta U-Net. Tras un ciclo, el Dice pasó de **0,7603 a 0,7866** en un conjunto de evaluación mixto con imágenes de prueba originales y diez imágenes del HOUB pseudoetiquetadas. Es una evidencia preliminar frente a etiquetas de referencia parcialmente automatizadas, no una validación independiente por especialistas.

## Alcance y próximos pasos

El trabajo también exploró la predicción a dos, cinco y diez años mediante datos longitudinales sintéticos. En ese escenario, la regresión Ridge no superó una referencia sencilla basada en la progresión media.

La aportación principal es un prototipo de investigación que integra detección, segmentación y medición. Para establecer su utilidad clínica serían necesarios conjuntos de datos más amplios, medidas validadas por especialistas y seguimiento longitudinal real.
