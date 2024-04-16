export const funEmojis = [
    "🍎", "🍌", "🍇", "🍓", "🍒", "🍑", "🍍", "🥥", "🥝", "🍅", 
    "🍆", "🥑", "🥦", "🥒", "🌶️", "🌽", "🥕", "🥔", "🍠", "🥐", 
    "🍞", "🥖", "🧀", "🥚", "🍳", "🥞", "🧇", "🥓", "🍔", "🍟", 
    "🍕", "🌭", "🥪", "🌮", "🌯", "🥙", "🧆", "🥗", "🥘", "🥫", 
    "🍝", "🍜", "🍲", "🍛", "🍣", "🍱", "🥟", "🦪", "🍤", "🍙"
];

export const getRandomEmoji = () => {
    const index = Math.floor(Math.random() * funEmojis.length);
    return funEmojis[index];
}
