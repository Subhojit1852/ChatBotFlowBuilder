💬 Chatbot Flow Design Note:

- The builder supports two node types:
  - Message: for static messages between any participants
  - User Input: for interactive steps or branching points

- In many real-world cases (e.g., WhatsApp bots), a conversation flow can be built using only Message nodes.

- If interactivity or bot-driven logic is introduced, User Input nodes are available to enrich the flow with context.

→ This allows the builder to scale from simple message flows to advanced chatbot decision trees.
