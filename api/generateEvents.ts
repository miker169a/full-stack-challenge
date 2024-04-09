// @ts-nocheck
const fs = require("fs")
const path = require("path")
const { v4: uuidv4 } = require("uuid")

const adjectives = [
    "Amazing",
    "Blissful",
    "Creative",
    "Delightful",
    "Epic",
    "Festive",
    "Glorious",
    "Harmonious",
]
const nouns = [
    "Concert",
    "Gala",
    "Festival",
    "Workshop",
    "Seminar",
    "Conference",
    "Retreat",
    "Symposium",
]
const topics = [
    "Music",
    "Art",
    "Technology",
    "Science",
    "Health",
    "Education",
    "Business",
    "History",
]
const fillerText =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

function generateRandomDate(daysRange) {
    const today = new Date()
    const shouldGoBack = Math.random() > 0.5
    const daysToAddOrSubtract =
    Math.floor(Math.random() * daysRange) * (shouldGoBack ? -1 : 1)
    // Adding random hours and minutes to the date
    const randomHour = Math.floor(Math.random() * 24)
    const minutesArray = [0, 15, 30, 45]
    const randomMinute =
    minutesArray[Math.floor(Math.random() * minutesArray.length)]

    const resultDate = new Date(
        today.setDate(today.getDate() + daysToAddOrSubtract),
    )
    resultDate.setHours(randomHour, randomMinute)

    return resultDate.toISOString()
}

function generateDescription() {
    const words = fillerText.split(" ")
    const start = Math.floor(Math.random() * (words.length - 200))
    const end = start + 50 + Math.floor(Math.random() * 150)
    return words.slice(start, Math.min(end, words.length)).join(" ")
}

function generateEventName() {
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)]
    const noun = nouns[Math.floor(Math.random() * nouns.length)]
    const topic = topics[Math.floor(Math.random() * topics.length)]
    return `${adjective} ${topic} ${noun}`
}
function generateTickets(numTickets) {
    const ticketNames = ["Tier 1", "Tier 2", "Tier 3", "Tier 4", "Tier 5", "VIP"]
    const ticketTypes = ["Family", "Child", "Adult", "OAP"]

    const tickets = []
    for (let i = 0; i < numTickets; i++) {
        const name = ticketNames[Math.floor(Math.random() * ticketNames.length)]
        const type = ticketTypes[Math.floor(Math.random() * ticketTypes.length)]
        const price = Math.floor(Math.random() * (50 - 10 + 1) + 10) // Random price between £10 and £50
        const bookingFee = Math.floor(Math.random() * (10 - 2 + 1) + 2) // Random booking fee between £2 and £10

        tickets.push({
            id: uuidv4(),
            name: name,
            type: type,
            price: price,
            bookingFee: bookingFee,
            availability: Math.random() > 0.5 ? "available" : "sold out",
        })
    }
    return tickets
}

function generateEvents(numEvents) {
    const events = []
    for (let i = 0; i < numEvents; i++) {
        events.push({
            id: uuidv4(),
            name: generateEventName(),
            date: generateRandomDate(365), // Random date within the next or past 365 days
            description: generateDescription(),
            tickets: generateTickets(Math.ceil(Math.random() * 5)),
        })
    }
    return events
}

const dummyData = generateEvents(200) // Generate 200 events
const filePath = path.join(__dirname, "src", "db", "db.json")

fs.writeFile(filePath, JSON.stringify(dummyData, null, 2), (err) => {
    if (err) throw err
    console.log("Dummy event data generated successfully!")
})
