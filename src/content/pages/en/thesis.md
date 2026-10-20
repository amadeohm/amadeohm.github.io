---
lang: en
kind: thesis
description: "A master's thesis on valuing observations and masked-prediction tasks through predictive information gain, studied in Bayesian linear regression and probabilistic principal component analysis."
---

## Question

Masked pre-training learns by repeatedly predicting missing parts of the data from observed context. But are all masked-prediction tasks equally informative?

This thesis asks whether the reduction of predictive uncertainty over a relevant target can be used to distinguish informative observations from redundant ones, and ultimately to decide which data are worth assimilating during learning.

## Approach

The thesis studies **predictive information gain (PredIG)** as a target-dependent measure of predictive uncertainty reduction.

Rather than asking how much a candidate changes model parameters, PredIG measures how much conditioning on that candidate reduces uncertainty about an observable predictive target. In masked prediction, this takes the form of comparing uncertainty about masked variables before and after observing additional context.

The idea is studied first in Bayesian linear regression, where predictive distributions and information-theoretic quantities are available in closed form, and then in probabilistic principal component analysis (PPCA), where it is applied to masked image prediction through Gaussian conditional distributions.

These settings allow PredIG to be studied both as a measure of predictive redundancy and as the basis of an accept–reject policy for data assimilation.

## Finding

The experiments show that predictive information is highly non-uniform across candidate observations and masked-prediction tasks: as learning progresses, many candidates provide little additional information about the chosen predictive target.

In selected experiments, a PredIG-based accept–reject policy removes more than 80% of candidate updates while retaining predictive performance close to full assimilation.

The result supports the use of predictive uncertainty reduction as a criterion for identifying redundancy, but it does not establish a universal rejection rate or imply an equivalent reduction in wall-clock time, FLOPs, or energy consumption.