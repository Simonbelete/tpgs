import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/color_table.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  title: "FAMILY NUTRITION",
  coverImage: "assets/materials/images/family_nutration.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(children: [
        'Enhance an understanding on the food groups for dietary diversification'
      ]),
      CourseBodyImage(
        image: 'assets/materials/images/10.png',
        description: "The six food groups",
      ),
      KeyMessages(children: [
        Bullet(children: [
          "To have a healthy and balanced diet means eating a variety of foods that supply nutrients that are important for the body. It does not mean eating expensive food. The food we eat is grouped into 5 groups"
        ])
      ]),
      // Food Groups
      SubTitleText(
        text: 'What are food groups?',
        fontSize: 27.0,
      ),
      Paragraph(
          title: "",
          body:
              "No food or food group contains all the nutrients the human body requires for optimal function and good health. The human body requires nutrients that come from a variety of foods. To achieve good dietary diversity, eating a variety of foods regularly and consuming foods from all food groups is important."),
      SubTitleText(
        text: 'Staples',
      ),
      Paragraph(
          title: "",
          body:
              "Foods in this group comprise the largest part of the diet. Cereal grains such as teff, sorghum, millet, maize, barley, oats, wheat, teff, rice, and starchy roots (cassava, potato, sweet potato) are included. Staples are a good source of energy."),
      SubTitleText(
        text: "Legumes and Nuts",
      ),
      Paragraph(
          title: "",
          body:
              "This group includes ground nuts, beans, chickpeas, and lentils. This food group is a good source of protein in addition to energy."),
      SubTitleText(
        text: "Animal-Source Foods",
      ),
      Paragraph(
          title: "",
          body:
              "Foods from animals, including meats, eggs, dairy, and fish, are good sources of protein, fats, and essential micronutrients (vitamins and minerals). These nutrients are critical for child growth and development in the first two years of life."),
      SubTitleText(
        text: "Vegetables",
      ),
      Paragraph(
          title: "",
          body:
              "This group’s food includes green leaf and yellow vegetables, including kale, spinach, celery, cucumber, peppers, broccoli, carrots, cauliflower, pumpkin, onion, and tomatoes. Vegetables provide essential micronutrients (vitamins and minerals)."),
      SubTitleText(
        text: "Fruits",
      ),
      Paragraph(
          title: "",
          body:
              "This group’s food includes bananas, oranges, lemons, papaya, avocado, peach, guava, watermelon, sweet melon, and many others. They mainly provide energy and essential micronutrients (vitamins and minerals)."),
      SubTitleText(
        text: "Fats",
      ),
      Paragraph(
          title: "",
          body:
              "Fats include cooking oils, oil seeds, avocados, and oil seeds. Some foods, such as animal-source products (meat, milk, and dairy products like butter and yogurt), also provide fat."),
      Remember(children: [
        'No one food provides all the nutrients.',
        'Eat a variety of diverse nutrient dense food.'
      ]),
      //
      // Dietary diversiﬁcation
      //
      SubTitleText(
        text: 'Dietary diversification',
        fontSize: 27.0,
      ),
      Objectives(children: [
        'Enhance an understanding on the benefits of dietary diversification'
      ]),
      KeyMessages(children: [
        Bullet(children: [
          'To have a healthy and balanced diet means eating a variety of foods that supply nutrients that are important for the body. It does not mean eating expensive food.',
          'The nutrients a person\'s body needs to function, grow and stay healthy can be found in many locally available foods.',
          'Pick food items from each of the food groups daily that are locally available: Staple foods (cereals/grains, roots and tubers); vegetables and fruits (diﬀ erent types - leaves, fruits and tubers - and colors - green, red, yellow/orange); meat/animal products and legumes/nuts (proteins); fats etc.',
          'Use simple and careful cooking methods to ensure maximum nutrients are obtained from foods.',
          'For instance the best way of cooking vegetables is by steaming them with a little water instead of boiling them. Leaves from vegetables such as spinach can be steamed for about ﬁ ve minutes in a sieve over rapidly boiling water.'
        ])
      ]),
      CourseBodyImage(image: "assets/materials/images/11.png"),

      Remember(children: [
        'To have a healthy diet does not mean eating expensive food. Use locally available food stuff'
      ]),

      //
      // Essential food based micronutrients: vitamins
      //
      SubTitleText(
        text: 'Essential food based micronutrients: vitamins',
        fontSize: 27.0,
      ),
      Objectives(children: [
        'Enhance an understanding on the sources and benefi ts of micronutrients'
      ]),
      CourseBodyImage(image: "assets/materials/images/12.png"),
      SubTitleText(
        text: "Vitamin A",
      ),
      SubTitleText(text: "Vitamin A - Functions", fontSize: 16.0),
      Bullet(children: [
        "Normal functioning of the visual System",
        "Growth and development",
        "immune function and reproduction",
        "Ensures proper bone growth."
      ]),
      SubTitleText(text: "Vitamin A - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Liver, eggs, fish oil, whole milk mango, pawpaw, orange-fleshed sweet potato, pumpkin, carrot, red palm oil, dark green leafy vegetables"),
      SubTitleText(text: "Vitamin A - Nutritional disorder", fontSize: 16.0),
      Bullet(children: [
        'Poor dark adaptation night blindness',
        'growth failure - stunting',
        'reduced resistance to infection'
      ]),
      SubTitleText(
        text: "Water Soluble Vitamins Vitamin B1 (Thiamine)",
      ),
      SubTitleText(text: "Vitamin B1 - Functions", fontSize: 16.0),
      Bullet(children: [
        "Important for energy metabolism",
        "An essential factor in the function of the nervous system",
        "Supports appetite"
      ]),
      SubTitleText(text: "Vitamin B1 - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Whole-grain cereals, beans, meat, fish, chicken, egg, milk, oil, seeds, legumes"),
      SubTitleText(text: "Vitamin B1 - Nutritional disorder", fontSize: 16.0),
      Bullet(children: [
        "Beriberi",
        "muscle weakness",
        "anorexia",
        "Oedema-body fluid retentions",
        "enlarged heart",
        "confusion"
      ]),
      SubTitleText(
        text: "Vitamin B2 (Ribofi avin)",
      ),
      SubTitleText(text: "Vitamin B2 - Functions", fontSize: 16.0),
      Bullet(children: [
        "Important for energy metabolism",
        "Supports normal vision, health and good skin"
      ]),
      SubTitleText(text: "Vitamin B2 - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Milk, Egg, liver, yoghurt, meat, dark green leafy vegetables, whole-grain cereals, fish , beans"),
      SubTitleText(text: "Vitamin B2 - Nutritional disorder", fontSize: 16.0),
      Bullet(children: [
        "Inflammation of the tongue",
        "swollen stomach",
        "oedema-body fluid retention"
      ]),
      SubTitleText(
        text: "Folate - Folic Acid",
      ),
      SubTitleText(
          text: "Vitamin Folate Folic Acid - Functions", fontSize: 16.0),
      Bullet(children: [
        "Required for building new cells, especially red blood cells and gastrointestinal cells"
      ]),
      SubTitleText(
          text: "Vitamin Folate Folic Acid - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Liver, red meat, green leafy vegetables, fish, legumes, groundnuts, whole-grain cereals, egg yolks, avocado"),
      SubTitleText(
          text: "Vitamin Folate Folic Acid - Nutritional disorder",
          fontSize: 16.0),
      Bullet(children: ["Anaemia", "Neural tube defects in new-borns."]),
      SubTitleText(
        text: "Vitamin C (Ascorbic acid)",
      ),
      SubTitleText(text: "Vitamin C - Functions", fontSize: 16.0),
      Bullet(children: [
        "Contributes to the formation of defenses against infections",
        "Helps with the healing of wounds",
        "Helps the body to use calcium and other nutrients to build bones and blood vessel walls",
        "Important for protein metabolism"
      ]),
      SubTitleText(text: "Vitamin C - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Orange, lemon, tangerine, mangoes, guava, tomato, spinach, fresh peas, cabbage, green leaves, tomatoes, peppers, potatoes, yams, fresh milk"),
      SubTitleText(text: "Vitamin C - Nutritional disorder", fontSize: 16.0),
      Bullet(children: [
        "Scurvy",
        "poor appetite",
        "fatigue",
        "retarded wound healing",
        "bleeding gums"
      ]),
      //
      // Essential food based micronutrients: minerals
      //
      SubTitleText(
        text: 'Essential food based micronutrients: minerals',
        fontSize: 27.0,
      ),
      SubTitleText(
        text: "Iron",
      ),
      SubTitleText(text: "Vitamin Iron - Functions", fontSize: 16.0),
      Bullet(children: [
        "Transports oxygen to the blood.",
        "Eliminates old red blood cells and",
        "builds new cells"
      ]),
      SubTitleText(text: "Vitamin Iron - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Red meat, Liver, Poultry, Shellfish, Egg, Ground nuts, Leafy vegetables, Lentils, Beans, Cowpeas, Soybean, Cereals Dried fruits"),
      SubTitleText(text: "Vitamin Iron - Nutritional disorder", fontSize: 16.0),
      Bullet(children: ["Anaemia", "Low Iron stores", "Extreme tiredness"]),
      SubTitleText(
        text: "Iodine",
      ),
      SubTitleText(text: "Vitamin Iodine - Functions", fontSize: 16.0),
      Bullet(children: [
        "Ensures the development and proper functioning of the brain and of the nervous system.",
        "Important for growth and metabolism",
        "Accelerate the combustion of nutrients that provide energy."
      ]),
      SubTitleText(text: "Vitamin Iodine - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Fish and other seafood, animal products, plants from soil rich in iodine, Iodized salt"),
      SubTitleText(
          text: "Vitamin Iodine - Nutritional disorder", fontSize: 16.0),
      Bullet(children: ["Goitre"]),
      SubTitleText(
        text: "Zinc",
      ),
      SubTitleText(text: "Vitamin Zinc - Functions", fontSize: 16.0),
      Bullet(children: [
        "Tissue growth, maintenance",
        "healing and development.",
        "Metabolism of carbohydrates,",
        "proteins and fats.",
        "Important in cell division.",
        "Immune system function.",
        "Smell and taste acuity.",
        "Wound healing.",
        "Helps in diarrheal management"
      ]),
      SubTitleText(text: "Vitamin Zinc - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Organs and meat of mammals, fowl, fish, poultry, whole grain cereals, milk, yoghurt, vegetables, corn, guavas, pumpkin seeds, shell fish, eggs, dairy products, nuts and seed, cereals, legumes"),
      SubTitleText(text: "Vitamin Zinc - Nutritional disorder", fontSize: 16.0),
      Bullet(children: [
        "Reduced resistance to infection",
        "skin ulceration",
        "Stunted growth"
      ]),
    ],
  ),
);
