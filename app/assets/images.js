import React from "react";
export default function imageArray() {
  const imgGallery = [
    {
      fact: "Tigers are the largest cat species in the world reaching up to 3.3 meters in length and weighing up to 670 pounds!",
      referenceimage: require("../assets/factSlides/tiger.jpg"),
    },
    {
      fact: "When a camel finally does find water, he can drink up to 40 gallons in one go.",
      referenceimage: require("../assets/factSlides/cammel.jpg"),
    },
    {
      fact: "A dogs sense of smell is at least 40x better than ours!",
      referenceimage: require("../assets/factSlides/dog.jpg"),
    },
    {
      fact: "Dolphins have 2 stomachs!",
      referenceimage: require("../assets/factSlides/dolphin.jpg"),
    },
    {
      fact: "Flamingos can sleep standing on one leg.",
      referenceimage: require("../assets/factSlides/flamingo.jpg"),
    },
    {
      fact: "Like a guided missile, the fox harnesses the Earth's magnetic field to hunt.",
      referenceimage: require("../assets/factSlides/fox.jpg"),
    },
    {
      fact: "Koalas survive on a diet of eucalyptus leaves and can eat up to a kilogram a day!",
      referenceimage: require("../assets/factSlides/koala.jpg"),
    },
    {
      fact: "Sheep do not have top front teeth.",
      referenceimage: require("../assets/factSlides/lamb.jpg"),
    },
    {
      fact: " Today, the only country outside of Africa that has wild lions is India",
      referenceimage: require("../assets/factSlides/lion.jpg"),
    },
    {
      fact: "Mother pigs sing to their babies while nursing.",
      referenceimage: require("../assets/factSlides/pig.jpg"),
    },
    {
      fact: "Polar bears are not actualy white, they are black underneath their fur!",
      referenceimage: require("../assets/factSlides/polar.jpg"),
    },
    {
      fact: "Roughly 30,000 quills cover the whole body except for the stomach, nose and bottom of their feet. ",
      referenceimage: require("../assets/factSlides/porcupine.jpg"),
    },
    {
      fact: " The name rhinoceros means ‘nose horn, it comes from Ancient Greek words: rhino (nose), ceros (horn).",
      referenceimage: require("../assets/factSlides/rino.jpg"),
    },
    {
      fact: "Some squirrels have pouches in their cheeks to help them store nuts",
      referenceimage: require("../assets/factSlides/squirrel.jpg"),
    },

    {
      fact: "Elephants use their trunks to suck up water to drink, it can contain up to 8 litres of water. They also use their trunks as a snorkel when swimming.",
      referenceimage: require("../assets/factSlides/elephant.jpg"),
    },
  ];
  function shuffleArray(array) {
    debugger;
    let newArry = [];
    let i = array.length - 1;
    for (; i > 9; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = array[i];
      newArry[i] = array[j];
      array[j] = temp;
    }
    return newArry;
  }
  let newImages = shuffleArray(imgGallery);
  React.useEffect(() => {
    newImages = shuffleArray(imgGallery);
  });

  return { newImages };
}