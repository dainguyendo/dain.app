---
title: Design Systems as a Common Language
date: "2019-03-04T22:40:32.169Z"
description: Using concepts from dictionaries as a tool to maintain design systems.
---

A reflection of "tips from an Airbnb designer regarding maintaining design systems". [Link to article](https://www.designsystems.com/stories/airbnb-designer-shares-pro-tips-for-maintaining-a-design-system/).

An understood and spoken shared language is a quality of a good system.

A shared language does not have to be a single programming language, nor a verbal language of a team. A synthesis of both `code` and communication. In this sense, aspects of the language are well-known throughout those who participate, used in day-to-day conversations, and have established mechanisms growth of the language.

Dictionaries are a great tool to enforce the idea of the shared language and thus strengthens the system. A dictionary in many ways can be compared as a form of documentation. And so, what are parts of a dictionary that are valuable in documentation?

1. Word or Phrase
2. Definition
3. Example
4. Synonyms

## Word or Phrase

Like a foreign word, the term of use should documented. This provides a single source truth for reference and reduces the effect of slang that can cause confusion of what contributors identify as words of the shared langauge. As part of a design system, these words should be acknowledged by both designers and engineers. It is important to realize that the term does not have to 100% accurate by either parties. As a shared language, _compromise and general understanding_ is what matters and a dictionary should be resource to settle contension.

#### Examples

- `<Heading/>` component
- What are brand colors?
- Implementation should be native first

## Definition

Once the word or term has been identified in the dictionary, what is it's significance? This should be the bulk of the glossary. Requirements, meaning, and explanation should be detailed in order to support recognition.

#### Examples

- A `<Heading/>` is a simple functional component. It renders a text heading. It has a single `prop` of `color: string`.
- Brand colors is a definied subset of approved colors chose by the design team. Those colors are `#FFFFFF`, `#000000`, etc.
- "_Native first_" means to be mobile responsive.

## Example

Examples play the important role of setting the standard of what it means to use the word correctly. This may provide better experiences for newcomers to adopt the shared language potentially.

Let's provide an example for our `<Heading/>` component.

This is what it looks like:

> ##### My Custom Heading

```html
<Heading color="black"> My Custom Heading </Heading>
```

## Synonyms

To demonstrate mastery of a language, one must be able to piece together similar words, and phrases. And as important, to be able to descern unrelated or non-conforming aspects. For a design system, proficiency of the language extends to knowing when new components or designs conflicts with existing documention.

For our `<Heading/>` component, we have learned by definition and example the use of the `color` property. A possible synonym would be to define the property as a `color` that belongs to what is defined as **brand colors**.

---

A wordbook containing these parts would actively pursue a place of record, a place of understanding, and a place of usage. The life and death of a design system is controlled by it's up keep. Consider a dictionary in this regard as a tool for maintenence.

#### Further readings,

- [Airbnb, "Building a visual language"](https://airbnb.design/building-a-visual-language/)
