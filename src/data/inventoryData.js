export const defaultEquipped = {
    skin: null,
    head: { id: 1, name: 'Кібер-Шолом', icon: '🖲️', rarity: 'rare', type: 'head', category: 'head', stat: '+5 Logic' },
    weapon: { id: 3, name: 'Енерго-Шабля', icon: '⚔️', rarity: 'legendary', type: 'weapon', category: 'weapon', stat: '+15 Logic' },
    body: { id: 2, name: 'Броня Кобзаря', icon: '🧥', rarity: 'epic', type: 'body', category: 'body', stat: '+10 Resilience' },
    accessory1: null,
    accessory2: null,
};

export const defaultInventory = [
    // Head
    { id: 1, name: 'Кібер-Шолом', icon: '🖲️', type: 'head', category: 'head', rarity: 'rare', stat: '+5 Logic', desc: 'Стандартний захист для техно-магів.' },
    { id: 4, name: 'Вуха Ская', icon: '🎧', type: 'head', category: 'head', rarity: 'common', stat: '+2 Creativity', desc: 'Допомагають краще чути ритм навчання.' },
    // Body (clothing)
    { id: 2, name: 'Броня Кобзаря', icon: '🧥', type: 'body', category: 'body', rarity: 'epic', stat: '+10 Resilience', desc: 'Посилена броня з вбудованими динаміками.' },
    { id: 5, name: 'Плащ Мавки', icon: '🌿', type: 'body', category: 'body', rarity: 'rare', stat: '+5 Vitality', desc: 'Сплетений з цифрових лоз лісу.' },
    // Weapon
    { id: 3, name: 'Енерго-Шабля', icon: '⚔️', type: 'weapon', category: 'weapon', rarity: 'legendary', stat: '+15 Logic', desc: 'Легендарна зброя, що розрізає віруси забуття.' },
    // Skin
    { id: 10, name: 'Скін: Неоновий Лицар', icon: '👤', type: 'skin', category: 'skin', rarity: 'epic', stat: '+5 Style', desc: 'Легендарний вигляд для твого героя.' },
    // Accessory
    { id: 12, name: 'Амулет Козака', icon: '📿', type: 'accessory1', category: 'accessory', rarity: 'rare', stat: '+3 Resilience', desc: 'Старовинний оберіг Запорізької Січі.' },
    // Bonus (consumable)
    { id: 11, name: 'Золоте Яблуко', icon: '🍎', type: 'consumable', category: 'bonus', rarity: 'rare', stat: '+50 Energy', desc: 'Миттєво відновлює енергію.' },
];
