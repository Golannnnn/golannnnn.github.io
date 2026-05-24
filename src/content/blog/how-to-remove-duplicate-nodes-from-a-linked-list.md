---
title: How remove duplicate nodes from a linked list
pubDate: 2024-08-16
---

When I first tried to solve this problem, I started coding without a clear algorithm and ended up wasting a lot of time. After some frustration, I had to take a break and think of another approach. So I grabbed a piece of paper and a pen and started writing down the problem and all the steps I needed to take to solve it. Then I started drawing the linked list and went through the algorithm step by step. In this post, I'll go over those steps.

I am assuming that you already have a basic understanding of linked lists. If you don't, I recommend reading [this article](https://www.geeksforgeeks.org/introduction-to-linked-list-data-structure/) or watch the beginning of [this video](https://youtu.be/Hj_rA0dhr2I?feature=shared&t=65).

### [Stating the problem and the constraints](#stating-the-problem-and-the-constraints)

Given a linked list, remove the duplicate nodes using an O(n) time complexity.

### [Drawing a linked list](#drawing-a-linked-list)

Draw a simple linked list with only one duplicate to make it easier to understand on the first try.

```
1 -> 2 -> 2 -> null
```

### [Brainstorming a solution](#brainstorming-a-solution)

Because of the O(n) constraint, you can only iterate through the list once. So, when you are in an iteration and you want to delete the current node, you have to point the previous node to the next node. For example, let's say you want to delete the second node in the following linked list:

```
1 -> 2 -> 3 -> null
```

You need to point the first node to the third node, like this:

```
1    2 -> 3 -> null
 \_______/
```

The second node is now effectively removed from the list, because there is no reference to it from the previous node. But for this to work, you need to have a variable for the previous node and a variable for the current node. Now we know how to remove a node.

Next, we need to think about how to detect a duplicate node. First, we need to keep track of the duplicate nodes we will encounter. You might think of using an array or an object, but looking up a value in an array or object is O(n) time complexity. And if you do that inside an iteration, you will end up with O(n^2) time complexity for your algorithm. So, we need a data structure that has O(1) time complexity for lookups. That's where a `Set` comes in. It stores unique values and has O(1) time complexity for lookups.

**So to summarize**, we need two variables to keep track of the previous and current nodes, a `Set` to store unique values and a loop to iterate through the list. In every iteration, we check if the value of the current node is inside the `Set`. If it is, we point the previous node to the next node. If it isn't, we add the value of the current node to the `Set` and point the previous node to the current node. Just before the next iteration, we point the current node to the next node. We do this until the current node is `null`.

### [Writing the algorithm in pseudocode](#writing-the-algorithm-in-pseudocode)

1. Create a `Set`.
2. Create a variable for the previous node `prev` and set it to `null`.
3. Create a variable for the current node `current` and set it to the head of the list.
4. Iterate through the list until the `current` node is `null`.
5. For every iteration, check if the value of the current node is inside the `Set`.
6. If it is, point `prev.next` to `current.next`.
7. If it isn't, add the value of the current node to the `Set` and point `prev` to `current`.
8. Point `current` to `current.next`.

### [Going through the algorithm with the example linked list](#going-through-the-algorithm-with-the-example-linked-list)

#### Initial State

```
Set()

null     (1) —–> (2) —–> (2) —–> null
 |        |
prev    current
```

#### 🔁 First Iteration

Is the value of the current node a duplicate? Is `1` inside the `Set`? No.

1. Add the value of the current node to the `Set`.
2. Point `prev` to `current`.
3. Point `current` to `current.next`.

```
Set(1)

(1) —–> (2) —–> (2) —–> null
 |       |
prev   current
```

#### 🔁 Second Iteration

Is the value of the current node a duplicate? Is `2` inside the `Set`? No.

1. Add the value of the current node to the `Set`.
2. Point `prev` to `current`.
3. Point `current` to `current.next`.

```
Set(1, 2)

(1) —–> (2) —–> (2) —–> null
         |       |
        prev   current
```

#### 🔁 Third Iteration

Is the value of the current node a duplicate? Is `2` inside the `Set`? Yes.

1. Point `prev.next` to `current.next`.
2. Point `current` to `current.next`.

```
Set(1, 2)

(1) —–> (2)        (2)       null
        /\___________________/\
      prev                   current
```

We effectively removed the duplicate node by severing all connections to it 🎉. The final linked list is:

```
Set(1, 2)

(1) —–> (2) —–> null
```

### [Writing the code](#writing-the-code)

I am using JavaScript for this example. Even if you are not familiar with JavaScript, you should be able to understand the code.

This function requires the head of the linked list as an argument and it expects a node to be an object with a `value` property and a `next` property that points to the next node. Like this:

```javascript
const node = {
  value: 1,
  next: {
    value: 2,
    next: null,
  },
};
```

Here is the function for removing duplicates according to our algorithm:

```javascript
function removeDuplicates(head) {
  const set = new Set();
  let prev = null;
  let current = head;

  while (current !== null) {
    if (set.has(current.value)) {
      prev.next = current.next;
    } else {
      set.add(current.value);
      prev = current;
    }

    current = current.next;
  }

  return head;
}
```

### [Conclusion](#conclusion)

When you are solving a problem, don't rush. Don't go straight into coding a solution. Instead, take your time to understand the problem. Use pen and paper to visualize the problem. Break it down into small and easy steps. You will be doing yourself a favor in the long run by developing a solid habit of problem-solving.
