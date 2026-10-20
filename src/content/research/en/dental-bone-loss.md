---
lang: en
slug: dental-bone-loss
title: "Vision-based analysis of medical images for assessing bone loss in dental implant patients"
titleLang: en
description: "How can dental radiographs be turned into interpretable measurements of bone loss? A study combining deep learning, classical computer vision, and uncertainty-guided adaptation to new images."
author: Amadeo Huerta Moncho
supervisor: Isiah Zaplana Agut
institution: Universitat Politècnica de Catalunya
programme: BSc in Artificial Intelligence
year: 2025
pdf: /documents/bachelor-thesis.pdf
---

## Question

This thesis investigates how to move from a periapical radiograph to interpretable measurements of bone loss around a dental implant. The challenge extends beyond detecting the implant: a useful measurement also depends on identifying the relevant part of its structure and the surrounding bone boundary.

The work connects computer vision and medical imaging through a complete experimental pipeline, from image preparation and model comparison to geometric measurement and adaptation to new data.

## Approach

I compared YOLOv8 and Faster R-CNN for implant detection, and U-Net and Mask R-CNN for segmentation. Alongside these supervised models, I developed a **hybrid approach combining the Segment Anything Model (SAM) with classical computer vision**. SAM isolates the implant body, while thresholding, mathematical morphology, and geometry-conditioned gradients extract the bone boundary.

The resulting regions support two complementary measurements: **vertical bone loss** and **area-based bone loss**. This makes the connection between image segmentation and the quantity being measured explicit.

Development used a public dataset of 200 radiographs, alongside an initial sample of 25 radiographs from nine patients provided through a collaboration with the Hospital Odontològic de la Universitat de Barcelona (HOUB).

## Findings

On the reported held-out test set, Faster R-CNN achieved an AP50 of **0.929** for implant detection, compared with **0.849** for YOLOv8s. U-Net obtained a Dice score of **0.8801** and an IoU of **0.7973** for segmentation. The hybrid method was assessed separately for its ability to isolate the implant body and extract measurement boundaries.

Applying the segmentation model to HOUB images exposed a domain shift. I explored an adaptation loop that selects images using pixel-wise predictive entropy, generates pseudo-labels with the classical vision pipeline, and fine-tunes U-Net. After one cycle, Dice increased from **0.7603 to 0.7866** on a mixed evaluation set containing original test images and ten pseudo-labelled HOUB images. This is preliminary evidence against partly automated reference labels, rather than independent expert validation.

## Scope and next steps

The work also explored prediction at two-, five-, and ten-year horizons using synthetic longitudinal data. Ridge regression did not outperform a simple mean-progression baseline in that setting.

The main contribution is an integrated research prototype for detection, segmentation, and measurement. Establishing its clinical usefulness would require larger datasets, expert-validated measurements, and real longitudinal follow-up.
