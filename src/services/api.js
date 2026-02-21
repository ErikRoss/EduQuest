// A simulated mock API to act as "Google Classroom" and "e-journal"

const MOCK_USER = {
    uid: 'user_123',
    name: 'Alex Student',
    role: 'student',
    avatar: 'mage', // Class (mage, warrior, rogue)
    xp: 450,
    level: 4,
    currency: { gold: 120, diamonds: 5 },
    inventory: ['avatar_skin_fire', 'weapon_wooden_staff'],
    equipped: {
        avatar: 'avatar_skin_fire',
        weapon: 'weapon_wooden_staff',
        armor: null
    }
};

const MOCK_GRADES = [
    { id: 'g1', subject: 'Math', value: 11, timestamp: new Date(Date.now() - 86400000).toISOString(), source: 'google_classroom' },
    { id: 'g2', subject: 'Science', value: 9, timestamp: new Date(Date.now() - 172800000).toISOString(), source: 'e_journal' },
    { id: 'g3', subject: 'History', value: 12, timestamp: new Date(Date.now() - 345600000).toISOString(), source: 'e_journal' },
];

export const fetchUserProfile = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_USER), 800);
    });
};

export const fetchRecentGrades = async () => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_GRADES), 1000);
    });
};

// Calculate rewards based on grade rules
// value: 1-12
export const processGradeReward = (gradeValue) => {
    let xp = 0;
    let gold = 0;
    let hasLootbox = false;

    if (gradeValue >= 1 && gradeValue <= 9) {
        xp = 10 * gradeValue;
        gold = 5 * gradeValue;
    } else if (gradeValue >= 10 && gradeValue <= 11) {
        xp = 150;
        gold = 100;
    } else if (gradeValue === 12) {
        xp = 300;
        gold = 250;
        hasLootbox = true;
    }

    return { xp, gold, hasLootbox };
};
