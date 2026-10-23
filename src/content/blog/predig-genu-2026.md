---
title: "Which observations are worth learning from?"
description: "An introduction to Predictive Information Gain, the idea behind the poster I presented at GenU 2026."
lang: en
slug: predig-genu-2026
translationKey: predig-genu-2026
published: 2026-9-23
draft: false
---
What if, during self-supervised learning, not every training observation is equally useful?

This was the question behind the poster I presented at [GenU 2026 in Copenhagen](/en/blog/genu-2026-copenhagen/), based on my [master’s thesis](/en/research/predig/), *On probabilistic prediction and information-theoretic operators*, supervised by Pablo Moreno-Muñoz. Here, I want to walk through the idea behind it: measuring the value of an observation through what it tells us about a prediction.

[View the poster (PDF)](/documents/GenU26_vertical_pdf.pdf)

## A prediction, a context, and a candidate

In masked pre-training, we hide part of an input and ask a model to predict it from the visible context. For an image, this means predicting missing pixels or regions from the parts we can already see.

The poster separates this into three pieces:

- **C — context:** what we have already observed.
- **B — candidate:** an additional observation we could reveal.
- **M — target:** the masked region we want to predict.

Different candidates can have different value. A region may tell us something new about the target, or largely repeat information already available in the context. Before revealing it, can we quantify how much it could help?

## Predictive Information Gain

We use entropy to describe uncertainty in the model’s predictive distribution. **Predictive Information Gain (PredIG)** compares that uncertainty before and after conditioning on a candidate observation.

The question is:

> How much does my predictive uncertainty about the same fixed target decrease after revealing this candidate?

For this comparison, **the target and the model stay fixed; only the conditioning changes**. We compare a prediction based on the current context with a prediction that also has access to the candidate. This isolates the information provided by that observation from the effects of updating the model’s parameters.

The score lives in predictive data space: it concerns uncertainty about the target we want to predict, rather than uncertainty about the model’s parameters. Entropy is measured in nats when using natural logarithms.

## Understanding the score in a controlled setting

We first study PredIG in Bayesian linear regression, where the relevant distributions can be computed analytically.

The poster follows the same learning process at different stages, showing the parameter posterior, the predictive distribution, and the PredIG scores across candidate observations. Early on, observations can substantially reduce predictive uncertainty. As evidence accumulates, the posterior contracts and predictions become more certain. Candidates that add little new information about the target receive scores approaching zero.

This controlled setting lets us examine how the score behaves before using it to decide which observations to accept or reject.

## From regression to masked images

We then move to MNIST images using probabilistic principal component analysis (PPCA), trained with a masked-prediction objective: maximising the average log-probability of masked pixels given revealed pixels.

PPCA provides closed-form Gaussian conditional distributions, allowing us to compute predictive entropy directly. Keeping a target fixed and moving the candidate region around an image produces a map of predictive information: some regions reduce uncertainty substantially, while others contribute little.

The poster also shows how these maps change during masked pre-training as the predictive model changes. Within each individual score calculation, the model remains fixed; across training stages, we evaluate different versions of that model.

## Towards more informative learning

The central message is that **not all masked-prediction tasks are equally informative**. PredIG offers a way to make that distinction explicit by measuring reductions in predictive uncertainty.

These experiments use tractable probabilistic models to understand the operator. They motivate a possible route towards filtering redundant updates, but do not by themselves establish efficiency gains for large neural models. Moving towards those settings also requires accounting for the cost of estimating the score and checking whether predictive performance is preserved.

For the full formulation and the figures discussed here, you can [read the poster](/documents/GenU26_vertical_pdf.pdf) or explore the [master’s thesis and its results](/en/research/predig/).
