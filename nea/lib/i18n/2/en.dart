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
      Paragraph(
          title: "",
          body:
              "Among the types of food groups listed in the image above, there are two food groups in the list of meat and meat products."),
      KeyMessages(children: [
        Bullet(children: [
          "To have a healthy and balanced diet means eating a variety of foods that supply nutrients that are important for the body. It does not mean eating expensive food. The food we eat is grouped into 6 groups"
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
      Paragraph(
          title: "Minimum Dietary diversity for Women ",
          body:
              "is a dichotomous indicator of whether or not women 15 to 49 years of age have consumed at least five out of ten defined food groups the previous day or night."),
      Paragraph(
          title: "Calculation formula WRA (Women of reproductive Age):- ",
          body: ""),
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
        "Immune function and reproduction",
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
        'Growth failure - stunting',
        'Reduced resistance to infection'
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
        "Muscle weakness",
        "Anorexia",
        "Oedema-body fluid retentions",
        "Enlarged heart",
        "Confusion"
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
        "Swollen stomach",
        "Oedema-body fluid retention"
      ]),
      SubTitleText(
        text: "Folic Acid",
      ),
      SubTitleText(text: "Folic Acid - Functions", fontSize: 16.0),
      Bullet(children: [
        "Required for building new cells, especially red blood cells and gastrointestinal cells"
      ]),
      SubTitleText(text: "Folic Acid - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Liver, red meat, green leafy vegetables, fish, legumes, groundnuts, whole-grain cereals, egg yolks, avocado"),
      SubTitleText(text: "Folic Acid - Nutritional disorder", fontSize: 16.0),
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
        "Poor appetite",
        "Fatigue",
        "Retarded wound healing",
        "Bleeding gums"
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
      SubTitleText(text: "Iron - Functions", fontSize: 16.0),
      Bullet(children: [
        "Transports oxygen to the blood",
        "Eliminates old red blood cells and",
        "Builds new cells"
      ]),
      SubTitleText(text: "Iron - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Red meat, Liver, Poultry, Shellfish, Egg, Ground nuts, Leafy vegetables, Lentils, Beans, Cowpeas, Soybean, Cereals Dried fruits"),
      SubTitleText(text: "Iron - Nutritional disorder", fontSize: 16.0),
      Bullet(children: ["Anaemia", "Low Iron stores", "Extreme tiredness"]),
      SubTitleText(
        text: "Iodine",
      ),
      SubTitleText(text: "Iodine - Functions", fontSize: 16.0),
      Bullet(children: [
        "Ensures the development and proper functioning of the brain and of the nervous system.",
        "Important for growth and metabolism",
        "Accelerate the combustion of nutrients that provide energy."
      ]),
      SubTitleText(text: "Iodine - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Fish and other seafood, animal products, plants from soil rich in iodine, Iodized salt"),
      SubTitleText(text: "Iodine - Nutritional disorder", fontSize: 16.0),
      Bullet(children: ["Goitre"]),
      SubTitleText(
        text: "Zinc",
      ),
      SubTitleText(text: "Zinc - Functions", fontSize: 16.0),
      Bullet(children: [
        "Tissue growth, maintenance",
        "Healing and development",
        "Metabolism of carbohydrates",
        "Proteins and fats",
        "Important in cell division",
        "Immune system function",
        "Smell and taste acuity",
        "Wound healing",
        "Helps in diarrheal management"
      ]),
      SubTitleText(text: "Zinc - Food sources", fontSize: 16.0),
      Paragraph(
          title: "",
          body:
              "Organs and meat of mammals, fowl, fish, poultry, whole grain cereals, milk, yoghurt, vegetables, corn, guavas, pumpkin seeds, shell fish, eggs, dairy products, nuts and seed, cereals, legumes"),
      SubTitleText(text: "Zinc - Nutritional disorder", fontSize: 16.0),
      Bullet(children: [
        "Reduced resistance to infection",
        "Skin ulceration",
        "Stunted growth"
      ]),

      SubTitleText(
        text:
            "Recommended Dietary Allowances (RDAs) for micronutrient children",
      ),
      Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowances (RDAs) for micronutrients, including vitamins and minerals, for children can vary depending on age, sex, and specific health conditions. The RDAs are set up by government health agencies and are designed to meet the nutritional needs of most of the population. It\'s important to note that individual requirements may vary, and it\'s always a good idea to consult a healthcare professional for personalized advice."),
      Paragraph(
          title: "Here are the RDAs for some key micronutrients for children:",
          body: ""),
      SubTitleText(
        text: "Vitamins",
        fontSize: 16.0,
      ),
      SubTitleText(
        text: "Vitamin A",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-3 years: 300 micrograms (mcg) per day',
        '4-8 years: 400 mcg per day',
        '9-13 years: 600 mcg per day'
      ]),
      SubTitleText(
        text: "Vitamin C",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-3 years: 15 milligrams (mg) per day',
        '4-8 years: 25 mg per day',
        '9-13 years: 45 mg per day'
      ]),
      SubTitleText(
        text: "Vitamin D",
        fontSize: 14,
      ),
      Bullet(children: ['1-18 years: 600 International Units (IU) per day']),
      SubTitleText(
        text: "Vitamin E",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-3 years: 6 mg per day',
        '4-8 years: 7 mg per day',
        '9-13 years: 11 mg per day',
      ]),
      SubTitleText(
        text: "Vitamin K",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-3 years: 30 mcg per day',
        '4-8 years: 55 mcg per day',
        '9-13 years: 60 mcg per day',
        'B Vitamins (Thiamine, Riboflavin, Niacin, B6, B12, Folate): Specific RDAs vary for each B vitamin and age group.',
      ]),

      SubTitleText(
        text: "Minerals",
        fontSize: 16.0,
      ),

      SubTitleText(
        text: "Calcium",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-3 years: 700 mg per day',
        '4-8 years: 1,000 mg per day',
        '9-18 years: 1,300 mg per day'
      ]),

      SubTitleText(
        text: "Iron",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-3 years: 7 mg per day',
        '4-8 years: 10 mg per day',
        '9-13 years: 8 mg per day',
        '14-18 years: 11 mg per day'
      ]),

      SubTitleText(
        text: "Zinc",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-3 years: 3 mg per day',
        '4-8 years: 5 mg per day',
        '9-13 years: 8 mg per day',
        '14-18 years: 11 mg per day;'
      ]),

      SubTitleText(
        text: "Iodine",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-8 years: 90 mcg per day',
        '9-13 years: 120 mcg per day',
        '14-18 years: 150 mcg per day'
      ]),

      SubTitleText(
        text: "Magnesium",
        fontSize: 14,
      ),
      Bullet(children: [
        '1-3 years: 80 mg per day',
        '4-8 years: 130 mg per day',
        '9-13 years: 240 mg per day',
        '14-18 years: 410 mg per day'
      ]),

      SubTitleText(
        text:
            "Recommended Dietary Allowances (RDAs) for children\'s macronutrients.",
      ),

      Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowances (RDAs) for children\'s macronutrients, including carbohydrates, proteins, and fats, are provided based on age and sex. Remember that these values are general guidelines, and individual nutritional needs may vary. Additionally, children with specific health conditions or higher activity levels may require adjustments to their macronutrient intake. It\'s always advisable to consult with a healthcare professional or a registered dietitian for personalized advice. Here are the general RDAs for macronutrients for children:"),
      SubTitleText(
        text: "Carbohydrates",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body: "Carbohydrates are a primary source of energy for the body."),
      SubTitleText(
        text: "Proteins",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body: "Proteins are essential for growth and development."),
      Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowance (RDA) for protein is based on age:"),
      Bullet(children: [
        '1-3 years: 13 grams per day',
        '4-8 years: 19 grams per day',
        '9-13 years: 34 grams per day',
        '14-18 years: 46-52 grams per day (varies by sex)'
      ]),
      SubTitleText(
        text: "Fats",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "Fats are important for brain development and the absorption of fat-soluble vitamins."),
      Paragraph(
          title: "",
          body:
              "The Dietary Guidelines for Americans recommend that 25-35% of total daily calories come from fats."),
      Bullet(children: [
        'For children 1-3 years, fat should provide 30-40% of total daily calories.',
        'For children 4-18 years, fat should provide about 25-35% of total daily calories.'
      ]),
      SubTitleText(
        text: "Saturated Fat",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body: "Fat intake should be less than 10% of total calories."),
      SubTitleText(
        text: "Trans Fat",
        fontSize: 14,
      ),
      Paragraph(
          title: "", body: "Trans-fat intake should be as low as possible."),
      SubTitleText(text: "Dietary Cholesterol", fontSize: 14),
      Paragraph(
          title: "",
          body:
              "There is no specific RDA for dietary cholesterol, but keeping intake as low as possible while maintaining a healthy diet is recommended."),
      Remember(children: [
        "It's important to note that these recommendations are general guidelines, and individual needs may vary. Factors such as physical activity level, growth rate, and overall health should be considered when determining the appropriate macronutrient intake for a child. Again, consulting with a healthcare professional or a registered dietitian can provide more personalized guidance based on a child\'s specific nutritional requirements."
      ]),

      SubTitleText(
        text:
            "Recommended Dietary Allowances (RDAs) of micronutrients for adults.",
      ),
      Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowances (RDAs) are nutrient intake recommendations set by health authorities to meet the needs of most healthy individuals. Micronutrients are essential vitamins and minerals the body requires in smaller amounts for various physiological functions. Here are the RDAs for selected micronutrients for adults in the United States:"),
      SubTitleText(
        text: "Vitamins",
        fontSize: 14,
      ),
      Bullet(children: [
        'Vitamin A: 900 micrograms (mcg) for men, 700 mcg for women',
        'Vitamin C: 90 milligrams (mg) for men, 75 mg for women',
        'Vitamin D: 15 micrograms (600 IU) for adults up to age 70, 20 micrograms (800 IU) for adults over 70',
        'Vitamin E: 15 milligrams (22.4 IU) for both men and women',
        'Vitamin K: 120 mcg for men, 90 mcg for women',
        'Thiamin (Vitamin B1): 1.2 mg for men, 1.1 mg for women',
        'Riboflavin (Vitamin B2): 1.3 mg for men, 1.1 mg for women',
        'Niacin (Vitamin B3): 16 mg for men, 14 mg for women',
        'Vitamin B6: 1.7 mg for men, 1.5 mg for women',
        'Folate (Vitamin B9): 400 mcg for both men and women',
        'Vitamin B12: 2.4 mcg for both men and women',
        'Pantothenic Acid (Vitamin B5): 5 mg for both men and women',
        'Biotin (Vitamin B7): 30 mcg for both men and women',
      ]),
      SubTitleText(
        text: "Minerals",
        fontSize: 14,
      ),
      Bullet(children: [
        'Calcium: 1000 mg for adults up to age 50, 1200 mg for adults over 50',
        'Iron: 8 mg for men, 18 mg for women (postmenopausal women: 8 mg)',
        'Magnesium: 400 mg for men, 310 mg for women',
        'Phosphorus: 700 mg for both men and women',
        'Potassium: 3400 mg for both men and women',
        'Sodium: The Adequate Intake (AI) is 1500 mg for both men and women (not an RDA, as it can vary widely among individuals)',
        'Zinc: 11 mg for men, 8 mg for women',
      ]),
      Remember(children: [
        'These values vary based on age, sex, pregnancy, and lactation. Individuals must consult healthcare professionals for personalized advice, especially if they have specific health conditions or dietary restrictions. Additionally, recommendations may vary in different countries, so it\'s advisable to refer to local guidelines when available.',
      ]),

      SubTitleText(
          text:
              'Recommended Dietary Allowances (RDAs) of macronutrients for adults.'),
      Paragraph(
          title: "",
          body:
              "Recommended Dietary Allowances (RDAs) for macronutrients are guidelines set by health authorities to guide the average daily intake of essential nutrients needed to meet the nutritional requirements of most healthy individuals. As of my last knowledge update in January 2022, the following are the RDAs for macronutrients for adults:"),
      SubTitleText(
        text: "Protein",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "RDA for adults: 0.8 grams per kilogram of body weight per day. Athletes and individuals engaged in heavy physical activity may require higher protein intake."),
      SubTitleText(
        text: "Fat",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "No specific RDA for fat, but the Acceptable Macronutrient Distribution Ranges (AMDRs) suggest that fat should make up 20-35% of total daily caloric intake. Within this range, saturated fat is recommended to be limited to less than 10% of total daily calories."),
      SubTitleText(
        text: "Carbohydrates",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "There is no specific RDA for carbohydrates, but the Acceptable Macronutrient Distribution Ranges (AMDRs) recommend that carbohydrates contribute 45-65% of daily caloric intake. Emphasis should be on consuming complex carbohydrates (whole grains, fruits, vegetables) rather than simple sugars."),
      Remember(children: [
        'These recommendations can vary based on age, sex, level of physical activity, and overall health. It\'s important to note that individual nutritional needs may differ, and consulting with a healthcare professional or a registered dietitian for personalized advice is recommended.',
        'Please remember that nutritional guidelines may be updated over time, so it\'s good to check with the latest resources or health authorities for the most current information.'
      ]),

      SubTitleText(
          text:
              "Recommended Dietary Allowance (RDA) for micronutrients during pregnancy."),
      Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowance (RDA) for micronutrients during pregnancy is important to ensure the health of both the mother and the developing fetus. It\'s important to note that individual nutrient needs may vary, and pregnant women should consult with healthcare professionals for personalized advice. The RDAs provided here are general guidelines for healthy pregnant women:"),

      Paragraph(
          title: "Folate (Folic Acid)",
          body:
              " 600 micrograms (mcg) per day. Folate is crucial for the early development of the neural tube, which forms the baby\'s brain and spinal cord."),
      Paragraph(
        title: "Iron",
        body:
            " 27 milligrams (mg) per day. Iron is needed to increase blood production during pregnancy and prevent iron-deficiency anemia.",
      ),
      Paragraph(
          title: "Calcium",
          body:
              " 1,000 mg per day (for women 19-50 years old) Calcium is essential for the development of the baby\'s bones and teeth."),
      Paragraph(
        title: "Vitamin D",
        body:
            " 600 international units (IU) per day. Vitamin D helps the body absorb calcium and is important for bone health.",
      ),
      Paragraph(
        title: "Iodine",
        body:
            " 220 mcg per day. Iodine is necessary to develop the baby\'s brain and nervous system.",
      ),
      Paragraph(
        title: "Vitamin A",
        body:
            " 770 mcg RAE (Retinol Activity Equivalents) per day. Vitamin A is important for vision, immune function, and skin health. However, excessive intake of vitamin A, especially in the form of retinol, can harm the fetus, so it's essential not to exceed the recommended levels.",
      ),
      Paragraph(
        title: "Vitamin C",
        body:
            " 85 mg per day. Vitamin C is important for the growth and repair of tissues.",
      ),
      Paragraph(
        title: "Vitamin E",
        body:
            " 15 mg per day. Vitamin E has antioxidant properties and is important for the baby\'s development.",
      ),
      Paragraph(
        title: "Thiamine (Vitamin B1)",
        body:
            " 1.4 mg per day. Thiamine is important for the baby\'s brain development and overall growth.",
      ),
      Paragraph(
        title: "Riboflavin (Vitamin B2)",
        body:
            " 1.4 mg per day. Riboflavin is important for developing the baby\'s bones, muscles, and nerves.",
      ),
      Paragraph(
        title: "Niacin (Vitamin B3):",
        body:
            " 18 mg per day. Niacin is important for the baby\'s development and helps convert food into energy.",
      ),
      Paragraph(
        title: "Vitamin B6:",
        body:
            " 1.9 mg per day. Vitamin B6 is important for the baby\'s brain development and helps the body convert food into energy.",
      ),
      Paragraph(
          title: "Vitamin B12",
          body:
              " 2.6 mcg per day. Vitamin B12 is crucial for the development of the baby\'s nervous system."),
      Paragraph(
          title: "Zinc ",
          body:
              " 11 mg per day. Zinc is important for the baby\'s growth and immune system functioning."),
      Remember(children: [
        'Pregnant women should obtain these nutrients through a well-balanced diet and, if necessary, supplements as their healthcare provider recommends. It\'s important to avoid excessive intake of certain vitamins and minerals, as this can harm both the mother and the baby. Always consult a healthcare professional for personalized advice based on individual health needs.'
      ]),

      SubTitleText(
          text:
              "Recommended Dietary Allowance (RDA) for macronutrients during pregnancy."),
      Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowance (RDA) for macronutrients during pregnancy varies based on individual factors such as age, weight, activity level, and overall health. However, there are general guidelines provided by health authorities that pregnant individuals can follow to ensure they meet their nutritional needs. Remember that consulting with a healthcare professional for personalized advice is crucial."),
      SubTitleText(
        text: "Protein",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body: "The RDA for protein during pregnancy is 71 grams per day."),
      Paragraph(
          title: "",
          body:
              "Good protein sources include lean meats, poultry, fish, eggs, dairy products, legumes, nuts, and seeds."),
      SubTitleText(
        text: "Carbohydrates",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "There is no specific RDA for carbohydrates during pregnancy, but they should make up about 45-65% of daily caloric intake."),
      Paragraph(
          title: "",
          body:
              "Choose complex carbohydrates such as whole grains, fruits, vegetables, and legumes for sustained energy."),
      SubTitleText(
        text: "Fats",
        fontSize: 14,
      ),
      Paragraph(
          title: "",
          body:
              "The RDA for fat during pregnancy is about 20-35% of total daily caloric intake."),
      Paragraph(
          title: "",
          body:
              "Focus on healthy fats, including sources such as avocados, nuts, seeds, olive oil, and fatty fish like salmon."),
      Remember(children: [
        'It\'s important to note that prenatal nutrition is not just about macronutrients. Micronutrients, such as folic acid, iron, calcium, vitamin D, and others, are also crucial during pregnancy. Prenatal vitamins are often recommended to help ensure that pregnant individuals get the necessary vitamins and minerals.',
        'Additionally, staying well-hydrated is essential during pregnancy. Drinking adequate water helps support the increased blood volume and amniotic fluid, among other functions.',
        'Always consult your healthcare provider for personalized advice and address any specific dietary concerns or conditions you may have during pregnancy. They can provide guidance based on your health status and needs.'
      ]),

      SubTitleText(
          text:
              'Recommended Dietary Allowance (RDA) for micronutrients during lactation.'),
      Paragraph(
          title: '',
          body:
              'The Recommended Dietary Allowance (RDA) for micronutrients during lactation can vary based on age, weight, and individual health conditions. However, here are general recommendations for some key micronutrients during lactation:'),
      Paragraph(
          title: "Vitamin A:",
          body: " RDA: 1,300 micrograms (mcg) daily for lactating women."),
      Paragraph(
          title: "Vitamin C:",
          body: " RDA: 120 milligrams (mg) per day for lactating women."),
      Paragraph(
          title: "Vitamin D:",
          body: " RDA: 15 micrograms (mcg) daily for lactating women."),
      Paragraph(
          title: "Vitamin E:",
          body: " RDA: 19 mg per day for lactating women."),
      Paragraph(
          title: "Vitamin K:",
          body: " RDA: 90 mcg per day for lactating women."),
      Paragraph(
          title: "Thiamine (Vitamin B1):",
          body: " RDA: 1.4 mg daily for lactating women."),
      Paragraph(
          title: "Riboflavin (Vitamin B2):",
          body: " RDA: 1.6 mg daily for lactating women."),
      Paragraph(
          title: "Niacin (Vitamin B3):",
          body: " RDA: 17 mg daily for lactating women."),
      Paragraph(
          title: "Vitamin B6:",
          body: " RDA: 2 mg per day for lactating women."),
      Paragraph(
          title: "Folate (Vitamin B9):",
          body: " RDA: 500 mcg daily for lactating women."),
      Paragraph(
          title: "Vitamin B12:",
          body: " RDA: 2.8 mcg per day for lactating women."),
      Paragraph(
          title: "Calcium:",
          body: " RDA: 1,000 mg per day for lactating women."),
      Paragraph(
          title: "Iron:", body: " RDA: 9 mg per day for lactating women."),
      Paragraph(
          title: "Zinc:", body: " RDA: 12 mg per day for lactating women."),
      Paragraph(
          title: "Copper:",
          body: " RDA: 1,300 mcg per day for lactating women."),
      Paragraph(
          title: "Iodine:", body: " RDA: 290 mcg per day for lactating women."),
      Remember(children: [
        'Lactating women need to maintain a well-balanced and nutritious diet to meet their increased nutrient needs during this period. However, individual requirements may vary, and it\'s always advisable to consult with a healthcare provider or a registered dietitian to tailor dietary recommendations to specific needs and circumstances.'
      ]),

      SubTitleText(
          text:
              'Recommended Dietary Allowance (RDA) for macronutrients during lactation.'),
      Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowance (RDA) for macronutrients during lactation can vary based on the mother\'s age, weight, activity level, and the amount of breast milk produced. However, here are general recommendations for macronutrient intake during lactation:"),
      Paragraph(
          title: "Protein:",
          body:
              " The RDA for protein during lactation is higher than during pregnancy or when not pregnant. On average, lactating women are advised to consume about 71 grams of protein daily. Good protein sources include lean meats, poultry, fish, dairy products, eggs, legumes, and nuts."),
      Paragraph(
          title: "Carbohydrates:",
          body:
              " Carbohydrate needs during lactation are similar to those during pregnancy. The RDA for carbohydrates is around 210 to 175 grams per day, depending on individual factors. Whole grains, fruits, vegetables, and legumes are excellent sources of carbohydrates."),
      Paragraph(
          title: "Fats:",
          body:
              " The RDA for fats during lactation is approximately 44 to 55 grams per day. It\'s important to focus on healthy fats, such as those found in avocados, nuts, seeds, olive oil, and fatty fish. Omega-3 fatty acids, particularly DHA (docosahexaenoic acid), are crucial for developing the baby\'s nervous system and are found in fatty fish, flaxseeds, and walnuts."),
      Paragraph(
          title: "Calories:",
          body:
              " Lactating women typically need additional calories to support milk production. On average, an extra 500 calories per day may be recommended, although individual needs can vary. It\'s essential to pay attention to hunger and fullness cues and adjust calorie intake accordingly."),
      Remember(children: [
        'Lactating women must stay well-hydrated, so drinking plenty of water is also important. Additionally, it\'s recommended that lactating women continue to take prenatal vitamins, especially those containing iron and folic acid.',
        'Breastfeeding mothers must consult with their healthcare providers or a registered dietitian to determine their nutritional needs based on individual factors. Nutrient requirements can vary, and personalized advice can ensure that both the mother and baby receive adequate nutrition during this important period.'
      ]),
    ],
  ),
);
