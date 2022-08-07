## React function component <!-- omit in toc -->

Date: 2022-08-07
Author: 24seconds

Table of contents
- [Background](#background)
- [Class vs Function](#class-vs-function)
- [Decision](#decision)


### Background

Localdrop is developed in ealry 2020. And at that time I were not sure about `function component`. Now it's 2022. I saw many people use `function component` widely. So it is good time to move to function component.  

### Class vs Function  
I want to make sure that why localdrop also needs `function component`. `Function component` is tightly coupled with `hooks`. For me `using function component` means `using hooks`. So let's see why hook is recommended.  

In the official docs, it recommends to use hooks in new components.
> We recommend trying Hooks in new code.
link:  https://reactjs.org/docs/hooks-faq.html#should-i-use-hooks-classes-or-a-mix-of-both

But they have **no plan** to to remove class component from React.
link: https://reactjs.org/docs/hooks-faq.html#do-i-need-to-rewrite-all-my-class-components

It seems there are some pain points about using class component in terms of reusability and complexity.
Class component is hard to reuse stateful logic between the components. And it seems hard to understand the concept of javascript `class` and code structure. 

link: [hooks intro motivation part](https://reactjs.org/docs/hooks-intro.html#motivation)

### Decision

To sum up, it is okay to use either class or function. But for the better code maangement - readability, reusability and ease of complexity - it's good to use function component. Plus I have not used hook before so it is good opportunity to get used to hook :D

So.. let's try to use hook as much as possible.


