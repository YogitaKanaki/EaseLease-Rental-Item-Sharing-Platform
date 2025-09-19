import logo from "./logo.png";
import logo2 from "./logo2.jpeg";
import addItem from "./addItem.png"
import profile from "./profile.jpg"
import banner from "./banner.webp"
import banner1 from "./banner1.jpg"
import arrow from "./arrow.svg"
import black_arrow from "./black_arrow.svg"
import camera_image from "./camera_image.jpg"
import furniture_image from "./furniture_image.jpg"
import camping_image from "./camping_image.jpeg"
import electronics_image from "./electronics_image.png"
import tools_image from "./tools_image.jpeg"
import vehicles_image from "./vehicles_image.jpg"
import events_image from "./events_image.avif"
import canon_img1 from "./canon_img1.jpg"
import canon_img2 from "./canon_img2.jpg"
import canon_img3 from "./canon_img3.jpg"
import sofa_img1 from "./sofa_img1.avif"
import sofa_img2 from "./sofa_img2.avif"
import bike_img1 from "./bike_img1.jpg"
import bike_img2 from "./bike_img2.jpg"
import ps5_img1 from "./ps5_img1.webp"
import ps5_img2 from "./ps5_img2.webp"
import drill_img1 from "./drill_img1.webp"
import drill_img2 from "./drill_img2.webp"
import events_img1 from "./events_img1.jpg"
import events_img2 from "./events_img2.webp"
import star_icon from "./star_icon.svg"
import star_dull_icon from "./star_dull_icon.svg"
import cart_icon from "./cart_icon.svg"
import search_icon from "./search_icon.svg"
import nav_cart_icon from "./nav_cart_icon.svg"
import arrow_right_icon_colored from "./arrow_right_icon_colored.svg"
import add_address_image from "./add_address_image.svg"
import upload_area from "./upload_area.png"

export const assets={
    logo,
    logo2,
    upload_area,
    add_address_image,
    arrow_right_icon_colored,
    nav_cart_icon,
    search_icon,
    cart_icon,
    star_icon,
    star_dull_icon,
    addItem,
    profile,
    banner,
    arrow,
    black_arrow,
    banner1,
    camera_image,
    furniture_image,
    vehicles_image,
    camping_image,
    electronics_image,
    tools_image,
    events_image,
    canon_img1,
    canon_img2,
    canon_img3,
    sofa_img1,
    sofa_img2,
    bike_img1,
    bike_img2,
    ps5_img1,
    ps5_img2,
    drill_img1,
    drill_img2,
    events_img1,
    events_img2,
};

export const categories = [
  {
    text: "Cameras & Lenses",
    path: "Cameras",
    image: camera_image,
    bgColor: "#F3F9FF",
  },
  {
    text: "Furniture & Home",
    path: "Furniture",
    image: furniture_image,
    bgColor: "#FFF4E6",
  },
  {
    text: "Vehicles & Bikes",
    path: "Vehicles",
    image: vehicles_image,
    bgColor: "#E9FAF1",
  },
  {
    text: "Camping & Outdoors",
    path: "Camping",
    image: camping_image,
    bgColor: "#F9EFFA",
  },
  {
    text: "Electronics",
    path: "Electronics",
    image: electronics_image,
    bgColor: "#FEF6DA",
  },
  {
    text: "Power Tools & Equipment",
    path: "Tools",
    image: tools_image,
    bgColor: "#F5F5F5",
  },
  {
    text: "Party & Event Supplies",
    path: "Events",
    image: events_image,
    bgColor: "#EAF6FF",
  },
];

export const dummyAddress = [
  { street: "130 Kuchan Nagar", city: "Solapur" ,state:"Maharashtra",zipcode:"413005",country:"India"},
];

export const DummyProducts = [
  // Cameras
  {
    _id: "cam01",
    name: "Canon DSLR Camera",
    category: "Cameras",
    pricePerDay: 500,
    deposit: 2000,
    image: [canon_img1, canon_img2, canon_img3],
    description: [
      "Professional DSLR camera",
      "Includes 18-55mm lens",
      "Ideal for photography and videography"
    ],
    availableFrom: "2025-07-30",  // default availability date
    availableTo: "2025-12-31",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
    owner: "John Doe"
  },
  {
    _id: "cam02",
    name: "Canon DSLR Camera New",
    category: "Cameras",
    pricePerDay: 500,
    deposit: 2000,
    image: [canon_img1, canon_img2, canon_img3],
    description: [
      "Professional DSLR camera",
      "Includes 18-55mm lens",
      "Ideal for photography and videography"
    ],
    availableFrom: "2025-07-30",  // default availability date
    availableTo: "2025-12-31",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
    owner: "Jane Smith"
  },

  // Furniture
  {
    _id: "fur01",
    name: "2-Seater Sofa",
    category: "Furniture",
    pricePerDay: 200,
    deposit: 1000,
    image: [sofa_img1, sofa_img2],
    description: [
      "Comfortable 2-seater",
      "Perfect for home or office use",
      "Clean and well maintained"
    ],
    availableFrom: "2025-07-30",
    availableTo: "2025-12-31",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
    owner: "Michael Johnson"
  },

  // Vehicles
  {
    _id: "veh01",
    name: "Royal Enfield Bike",
    category: "Vehicles",
    pricePerDay: 1000,
    deposit: 5000,
    image: [bike_img1, bike_img2],
    description: [
      "Royal Enfield Classic 350",
      "Great for road trips",
      "Helmet included"
    ],
    availableFrom: "2025-07-30",
    availableTo: "2025-12-31",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
    owner: "Emily Davis"
  },

  // Electronics / Gaming
  {
    _id: "elec01",
    name: "PlayStation 5",
    category: "Electronics",
    pricePerDay: 700,
    deposit: 3000,
    image: [ps5_img1, ps5_img2],
    description: [
      "Latest PS5 console",
      "2 controllers included",
      "Ideal for parties and gaming events"
    ],
    availableFrom: "2025-07-30",
    availableTo: "2025-12-31",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Tools
  {
    _id: "tool01",
    name: "Power Drill Machine",
    category: "Tools",
    pricePerDay: 150,
    deposit: 500,
    image: [drill_img1, drill_img2],
    description: [
      "Heavy duty power drill",
      "Comes with multiple drill bits",
      "Perfect for home and construction work"
    ],
    availableFrom: "2025-07-30",
    availableTo: "2025-12-31",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },

  // Event Supplies
  {
    _id: "evt01",
    name: "Birthday Decoration",
    category: "Events",
    pricePerDay: 300,
    deposit: 1000,
    image: [events_img1, events_img2],
    description: [
      "High-quality sound system",
      "Wireless mic included",
      "Perfect for events and parties"
    ],
    availableFrom: "2025-07-30",
    availableTo: "2025-12-31",
    createdAt: "2025-03-25T07:17:46.018Z",
    updatedAt: "2025-03-25T07:18:13.103Z",
    inStock: true,
  },
];

export const dummyRentals = [
  {
    _id: "67f258798f87e633667863a1",
    userId: "67b5880e4d09769c5ca61644",
    name: "John Doe", // Renter's name
    contact: "john@gmail.com",
    items: [
      {
        product: DummyProducts[0], // e.g., Canon DSLR Camera
        quantity: 1,
        _id: "67f258798f87e633667863a2",
      },
    ],
    amount: 2500,
    address: dummyAddress[0],
    paymentType: "Online Payment",
    isPaid: true,
    startDate: "2025-08-01",
    endDate: "2025-08-05",
    createdAt: "2025-07-30T09:30:00.000Z",
    updatedAt: "2025-07-30T09:30:00.000Z",
  },
  {
    _id: "67f258798f87e633667863a3",
    userId: "67b5880e4d09769c5ca61644",
    name: "Jane Smith", // Renter's name
    contact: "sofa@dummyrentals.com", // ✅ added contact
    items: [
      {
        product: DummyProducts[2], // e.g., Sofa 
        quantity: 1,
        _id: "67f258798f87e633667863a4",
      },
    ],
    amount: 6000,
    address: dummyAddress[1],
    paymentType: "Credit Card",
    isPaid: false,
    startDate: "2025-08-10",
    endDate: "2025-08-15",
    createdAt: "2025-07-29T10:00:00.000Z",
    updatedAt: "2025-07-29T10:00:00.000Z",
  },
];







//





