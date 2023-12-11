import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:nea/i18n/foods.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/utils/open_url.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/course_video_player.dart';
import 'package:nea/widgets/food_grid_list.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  title: "INTRODUCTION",
  coverImage: "assets/materials/images/nu.jpg",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: [
      const Paragraph(
          title: "Food ",
          body:
              "is a substance consisting essentially of protein, carbohydrate, fat, and other nutrients used in the body of an organism to sustain growth and vital processes and to furnish energy. The body's absorption and utilization of food are fundamental to nutrition and are facilitated by digestion. "),
      const Paragraph(
          title: "Nutrition ",
          body:
              " is food intake and the interplay of biological, social, and economic processes that influence the body's growth, function, and repair. "),
      const Paragraph(
          title: "Nutrients ",
          body:
              "are components in foods that an organism uses to survive and grow. There are two types of nutrients: Macronutrients and micronutrients. Macronutrients provide the bulk energy an organism's metabolic system needs to function, while micronutrients provide the necessary cofactors for metabolism to be carried out. Both types of nutrients can be acquired from the diet. Macronutrients include carbohydrates, proteins, fats, and water, whereas Micronutrients include vitamins and Macronutrients. "),
      const SubTitleText(
        text: "Macronutrients",
      ),
      const SubTitleText(
        text: "Carbohydrates",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Carbohydrates ",
          body:
              "provide the body with energy to keep alive, build and repair tissues, stay warm, and move and work. Carbohydrates are the most abundant and economical source of food energy in the human diet. "),
      const Paragraph(
          title: "",
          body:
              "What major food sources of carbohydrates does a diet include?"),
      // const CourseBodyImage(
      //   image: "assets/materials/images/carbohydrates.png",
      //   // description: "Sources of carbohydrates",
      // ),
      const SubTitleText(
        text: "Source of Carbohydrates",
        fontSize: 14,
      ),
      FoodGridList(foods: carbohydratesFood),
      const SubTitleText(
        text: "Proteins",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Proteins ",
          body:
              "provide the body with essential amino acids that have a range of functions: growth and development, repair or replacement of tissues, production of metabolic and digestive enzymes, and production of some hormones. "),
      const Paragraph(
          title: "",
          body: "What major food sources of proteins does a diet include?"),
      // const CourseBodyImage(
      //   image: "assets/materials/images/proteins.png",
      //   // description: "Sources of proteins",
      // ),
      // Fats
      const SubTitleText(
        text: "Fats",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Fats ",
          body:
              "provide the body with essential fatty acids necessary to build cell membranes and to make hormones. They also help the body absorb and transport some essential vitamins. Fats also provide the body with a concentrated source of energy. Fats are necessary for growth, reproduction, skin integrity, maintaining cells, and using body fat for energy. "),
      const Paragraph(
          title: "",
          body: "What major food sources of fats does a diet include?"),
      // const CourseBodyImage(
      //   image: "assets/materials/images/fats.png",
      //   // description: "Sources of Fats",
      // ),
      const SubTitleText(
        text: "Source of Fats",
        fontSize: 14,
      ),
      FoodGridList(foods: fatsFood),
      const SubTitleText(
        text: "Water",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Water ",
          body:
              "is essential for life, and getting the right amount of fluid to be healthy is very important. The body requires adequate fresh water on a daily basis."),
      const SubTitleText(
        text: "Micronutrients",
      ),
      // Vitamins
      const SubTitleText(
        text: "Vitamins",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Vitamins ",
          body:
              "play different roles in helping the body in important ways. Some examples include building protein and cells, protecting cells from damage, building bones, protecting vision, metabolizing macronutrients, and helping to heal wounds. Without essential vitamins, multiple nutritional diseases can result."),
      // const CourseBodyImage(
      //   image: "assets/materials/images/vitamins.png",
      //   // description: "Sources of Vitamins",
      // ),
      const SubTitleText(
        text: "Source of Vitamins",
        fontSize: 14,
      ),
      FoodGridList(foods: vitaminsFood),
      // Minerals
      const SubTitleText(
        text: "Minerals",
        fontSize: 16.0,
      ),
      const Paragraph(
          title: "Minerals ",
          body:
              "are solid, inorganic groups of compounds like essential building blocks of different types of cells. Essential minerals include iron, zinc, calcium, and iodine. For example, iron is part of red blood cells, which transport oxygen through the body. Zinc has many critical functions in the body, including the make-up of cells and body systems, including immune function."),
      // const CourseBodyImage(
      //   image: "assets/materials/images/minerals.png",
      //   // description: "Sources of Minerals",
      // ),
      const SubTitleText(
        text: "Source of Minerals",
        fontSize: 14,
      ),
      FoodGridList(foods: mineralsFood),
      const Paragraph(
          title: "Nutrient requirements ",
          body:
              "refer to the different nutrients the body requires for energy, growth and repair, and protection from disease. They differ according to age, gender, physical activity, height, weight, and health status of the individual. "),

      const SubTitleText(
        text:
            "Recommended Dietary Allowances (RDAs) for micronutrient children",
      ),
      const Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowances (RDAs) for micronutrients, including vitamins and minerals, for children can vary depending on age, sex, and specific health conditions. The RDAs are set up by government health agencies and are designed to meet the nutritional needs of most of the population. It\'s important to note that individual requirements may vary, and it\'s always a good idea to consult a healthcare professional for personalized advice."),
      const Paragraph(
          title: "Here are the RDAs for some key micronutrients for children:",
          body: ""),
      const SubTitleText(
        text: "Vitamins",
        fontSize: 16.0,
      ),
      const SubTitleText(
        text: "Vitamin A",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-3 years: 300 micrograms (mcg) per day',
        '4-8 years: 400 mcg per day',
        '9-13 years: 600 mcg per day'
      ]),
      const SubTitleText(
        text: "Vitamin C",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-3 years: 15 milligrams (mg) per day',
        '4-8 years: 25 mg per day',
        '9-13 years: 45 mg per day'
      ]),
      const SubTitleText(
        text: "Vitamin D",
        fontSize: 14,
      ),
      const Bullet(
          children: ['1-18 years: 600 International Units (IU) per day']),
      const SubTitleText(
        text: "Vitamin E",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-3 years: 6 mg per day',
        '4-8 years: 7 mg per day',
        '9-13 years: 11 mg per day',
      ]),
      const SubTitleText(
        text: "Vitamin K",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-3 years: 30 mcg per day',
        '4-8 years: 55 mcg per day',
        '9-13 years: 60 mcg per day',
        'B Vitamins (Thiamine, Riboflavin, Niacin, B6, B12, Folate): Specific RDAs vary for each B vitamin and age group.',
      ]),

      const SubTitleText(
        text: "Minerals",
        fontSize: 16.0,
      ),

      const SubTitleText(
        text: "Calcium",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-3 years: 700 mg per day',
        '4-8 years: 1,000 mg per day',
        '9-18 years: 1,300 mg per day'
      ]),

      const SubTitleText(
        text: "Iron",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-3 years: 7 mg per day',
        '4-8 years: 10 mg per day',
        '9-13 years: 8 mg per day',
        '14-18 years: 11 mg per day'
      ]),

      const SubTitleText(
        text: "Zinc",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-3 years: 3 mg per day',
        '4-8 years: 5 mg per day',
        '9-13 years: 8 mg per day',
        '14-18 years: 11 mg per day;'
      ]),

      const SubTitleText(
        text: "Iodine",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-8 years: 90 mcg per day',
        '9-13 years: 120 mcg per day',
        '14-18 years: 150 mcg per day'
      ]),

      const SubTitleText(
        text: "Magnesium",
        fontSize: 14,
      ),
      const Bullet(children: [
        '1-3 years: 80 mg per day',
        '4-8 years: 130 mg per day',
        '9-13 years: 240 mg per day',
        '14-18 years: 410 mg per day'
      ]),

      const SubTitleText(
        text:
            "Recommended Dietary Allowances (RDAs) for children\'s macronutrients.",
      ),

      const Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowances (RDAs) for children\'s macronutrients, including carbohydrates, proteins, and fats, are provided based on age and sex. Remember that these values are general guidelines, and individual nutritional needs may vary. Additionally, children with specific health conditions or higher activity levels may require adjustments to their macronutrient intake. It\'s always advisable to consult with a healthcare professional or a registered dietitian for personalized advice. Here are the general RDAs for macronutrients for children:"),
      const SubTitleText(
        text: "Carbohydrates",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body: "Carbohydrates are a primary source of energy for the body."),
      const SubTitleText(
        text: "Proteins",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body: "Proteins are essential for growth and development."),
      const Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowance (RDA) for protein is based on age:"),
      const Bullet(children: [
        '1-3 years: 13 grams per day',
        '4-8 years: 19 grams per day',
        '9-13 years: 34 grams per day',
        '14-18 years: 46-52 grams per day (varies by sex)'
      ]),
      const SubTitleText(
        text: "Fats",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "Fats are important for brain development and the absorption of fat-soluble vitamins."),
      const Paragraph(
          title: "",
          body:
              "The Dietary Guidelines for Americans recommend that 25-35% of total daily calories come from fats."),
      const Bullet(children: [
        'For children 1-3 years, fat should provide 30-40% of total daily calories.',
        'For children 4-18 years, fat should provide about 25-35% of total daily calories.'
      ]),
      const SubTitleText(
        text: "Saturated Fat",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body: "Fat intake should be less than 10% of total calories."),
      const SubTitleText(
        text: "Trans Fat",
        fontSize: 14,
      ),
      const Paragraph(
          title: "", body: "Trans-fat intake should be as low as possible."),
      const SubTitleText(text: "Dietary Cholesterol", fontSize: 14),
      const Paragraph(
          title: "",
          body:
              "There is no specific RDA for dietary cholesterol, but keeping intake as low as possible while maintaining a healthy diet is recommended."),
      const Remember(children: [
        "It's important to note that these recommendations are general guidelines, and individual needs may vary. Factors such as physical activity level, growth rate, and overall health should be considered when determining the appropriate macronutrient intake for a child. Again, consulting with a healthcare professional or a registered dietitian can provide more personalized guidance based on a child\'s specific nutritional requirements."
      ]),

      const SubTitleText(
        text:
            "Recommended Dietary Allowances (RDAs) of micronutrients for adults.",
      ),
      const Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowances (RDAs) are nutrient intake recommendations set by health authorities to meet the needs of most healthy individuals. Micronutrients are essential vitamins and minerals the body requires in smaller amounts for various physiological functions. Here are the RDAs for selected micronutrients for adults in the United States:"),
      const SubTitleText(
        text: "Vitamins",
        fontSize: 14,
      ),
      const Bullet(children: [
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
      const SubTitleText(
        text: "Minerals",
        fontSize: 14,
      ),
      const Bullet(children: [
        'Calcium: 1000 mg for adults up to age 50, 1200 mg for adults over 50',
        'Iron: 8 mg for men, 18 mg for women (postmenopausal women: 8 mg)',
        'Magnesium: 400 mg for men, 310 mg for women',
        'Phosphorus: 700 mg for both men and women',
        'Potassium: 3400 mg for both men and women',
        'Sodium: The Adequate Intake (AI) is 1500 mg for both men and women (not an RDA, as it can vary widely among individuals)',
        'Zinc: 11 mg for men, 8 mg for women',
      ]),
      const Remember(children: [
        'These values vary based on age, sex, pregnancy, and lactation. Individuals must consult healthcare professionals for personalized advice, especially if they have specific health conditions or dietary restrictions. Additionally, recommendations may vary in different countries, so it\'s advisable to refer to local guidelines when available.',
      ]),

      const SubTitleText(
          text:
              'Recommended Dietary Allowances (RDAs) of macronutrients for adults.'),
      const Paragraph(
          title: "",
          body:
              "Recommended Dietary Allowances (RDAs) for macronutrients are guidelines set by health authorities to guide the average daily intake of essential nutrients needed to meet the nutritional requirements of most healthy individuals. As of my last knowledge update in January 2022, the following are the RDAs for macronutrients for adults:"),
      const SubTitleText(
        text: "Protein",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "RDA for adults: 0.8 grams per kilogram of body weight per day. Athletes and individuals engaged in heavy physical activity may require higher protein intake."),
      const SubTitleText(
        text: "Fat",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "No specific RDA for fat, but the Acceptable Macronutrient Distribution Ranges (AMDRs) suggest that fat should make up 20-35% of total daily caloric intake. Within this range, saturated fat is recommended to be limited to less than 10% of total daily calories."),
      const SubTitleText(
        text: "Carbohydrates",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "There is no specific RDA for carbohydrates, but the Acceptable Macronutrient Distribution Ranges (AMDRs) recommend that carbohydrates contribute 45-65% of daily caloric intake. Emphasis should be on consuming complex carbohydrates (whole grains, fruits, vegetables) rather than simple sugars."),
      const Remember(children: [
        'These recommendations can vary based on age, sex, level of physical activity, and overall health. It\'s important to note that individual nutritional needs may differ, and consulting with a healthcare professional or a registered dietitian for personalized advice is recommended.',
        'Please remember that nutritional guidelines may be updated over time, so it\'s good to check with the latest resources or health authorities for the most current information.'
      ]),

      const SubTitleText(
          text:
              "Recommended Dietary Allowance (RDA) for micronutrients during pregnancy."),
      const Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowance (RDA) for micronutrients during pregnancy is important to ensure the health of both the mother and the developing fetus. It\'s important to note that individual nutrient needs may vary, and pregnant women should consult with healthcare professionals for personalized advice. The RDAs provided here are general guidelines for healthy pregnant women:"),

      const Paragraph(
          title: "Folate (Folic Acid)",
          body:
              " 600 micrograms (mcg) per day. Folate is crucial for the early development of the neural tube, which forms the baby\'s brain and spinal cord."),
      const Paragraph(
        title: "Iron",
        body:
            " 27 milligrams (mg) per day. Iron is needed to increase blood production during pregnancy and prevent iron-deficiency anemia.",
      ),
      const Paragraph(
          title: "Calcium",
          body:
              " 1,000 mg per day (for women 19-50 years old) Calcium is essential for the development of the baby\'s bones and teeth."),
      const Paragraph(
        title: "Vitamin D",
        body:
            " 600 international units (IU) per day. Vitamin D helps the body absorb calcium and is important for bone health.",
      ),
      const Paragraph(
        title: "Iodine",
        body:
            " 220 mcg per day. Iodine is necessary to develop the baby\'s brain and nervous system.",
      ),
      const Paragraph(
        title: "Vitamin A",
        body:
            " 770 mcg RAE (Retinol Activity Equivalents) per day. Vitamin A is important for vision, immune function, and skin health. However, excessive intake of vitamin A, especially in the form of retinol, can harm the fetus, so it's essential not to exceed the recommended levels.",
      ),
      const Paragraph(
        title: "Vitamin C",
        body:
            " 85 mg per day. Vitamin C is important for the growth and repair of tissues.",
      ),
      const Paragraph(
        title: "Vitamin E",
        body:
            " 15 mg per day. Vitamin E has antioxidant properties and is important for the baby\'s development.",
      ),
      const Paragraph(
        title: "Thiamine (Vitamin B1)",
        body:
            " 1.4 mg per day. Thiamine is important for the baby\'s brain development and overall growth.",
      ),
      const Paragraph(
        title: "Riboflavin (Vitamin B2)",
        body:
            " 1.4 mg per day. Riboflavin is important for developing the baby\'s bones, muscles, and nerves.",
      ),
      const Paragraph(
        title: "Niacin (Vitamin B3):",
        body:
            " 18 mg per day. Niacin is important for the baby\'s development and helps convert food into energy.",
      ),
      const Paragraph(
        title: "Vitamin B6:",
        body:
            " 1.9 mg per day. Vitamin B6 is important for the baby\'s brain development and helps the body convert food into energy.",
      ),
      const Paragraph(
          title: "Vitamin B12",
          body:
              " 2.6 mcg per day. Vitamin B12 is crucial for the development of the baby\'s nervous system."),
      const Paragraph(
          title: "Zinc ",
          body:
              " 11 mg per day. Zinc is important for the baby\'s growth and immune system functioning."),
      const Remember(children: [
        'Pregnant women should obtain these nutrients through a well-balanced diet and, if necessary, supplements as their healthcare provider recommends. It\'s important to avoid excessive intake of certain vitamins and minerals, as this can harm both the mother and the baby. Always consult a healthcare professional for personalized advice based on individual health needs.'
      ]),

      const SubTitleText(
          text:
              "Recommended Dietary Allowance (RDA) for macronutrients during pregnancy."),
      const Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowance (RDA) for macronutrients during pregnancy varies based on individual factors such as age, weight, activity level, and overall health. However, there are general guidelines provided by health authorities that pregnant individuals can follow to ensure they meet their nutritional needs. Remember that consulting with a healthcare professional for personalized advice is crucial."),
      const SubTitleText(
        text: "Protein",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body: "The RDA for protein during pregnancy is 71 grams per day."),
      const Paragraph(
          title: "",
          body:
              "Good protein sources include lean meats, poultry, fish, eggs, dairy products, legumes, nuts, and seeds."),
      const SubTitleText(
        text: "Carbohydrates",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "There is no specific RDA for carbohydrates during pregnancy, but they should make up about 45-65% of daily caloric intake."),
      const Paragraph(
          title: "",
          body:
              "Choose complex carbohydrates such as whole grains, fruits, vegetables, and legumes for sustained energy."),
      const SubTitleText(
        text: "Fats",
        fontSize: 14,
      ),
      const Paragraph(
          title: "",
          body:
              "The RDA for fat during pregnancy is about 20-35% of total daily caloric intake."),
      const Paragraph(
          title: "",
          body:
              "Focus on healthy fats, including sources such as avocados, nuts, seeds, olive oil, and fatty fish like salmon."),
      const Remember(children: [
        'It\'s important to note that prenatal nutrition is not just about macronutrients. Micronutrients, such as folic acid, iron, calcium, vitamin D, and others, are also crucial during pregnancy. Prenatal vitamins are often recommended to help ensure that pregnant individuals get the necessary vitamins and minerals.',
        'Additionally, staying well-hydrated is essential during pregnancy. Drinking adequate water helps support the increased blood volume and amniotic fluid, among other functions.',
        'Always consult your healthcare provider for personalized advice and address any specific dietary concerns or conditions you may have during pregnancy. They can provide guidance based on your health status and needs.'
      ]),

      const SubTitleText(
          text:
              'Recommended Dietary Allowance (RDA) for micronutrients during lactation.'),
      const Paragraph(
          title: '',
          body:
              'The Recommended Dietary Allowance (RDA) for micronutrients during lactation can vary based on age, weight, and individual health conditions. However, here are general recommendations for some key micronutrients during lactation:'),
      const Paragraph(
          title: "Vitamin A:",
          body: " RDA: 1,300 micrograms (mcg) daily for lactating women."),
      const Paragraph(
          title: "Vitamin C:",
          body: " RDA: 120 milligrams (mg) per day for lactating women."),
      const Paragraph(
          title: "Vitamin D:",
          body: " RDA: 15 micrograms (mcg) daily for lactating women."),
      const Paragraph(
          title: "Vitamin E:",
          body: " RDA: 19 mg per day for lactating women."),
      const Paragraph(
          title: "Vitamin K:",
          body: " RDA: 90 mcg per day for lactating women."),
      const Paragraph(
          title: "Thiamine (Vitamin B1):",
          body: " RDA: 1.4 mg daily for lactating women."),
      const Paragraph(
          title: "Riboflavin (Vitamin B2):",
          body: " RDA: 1.6 mg daily for lactating women."),
      const Paragraph(
          title: "Niacin (Vitamin B3):",
          body: " RDA: 17 mg daily for lactating women."),
      const Paragraph(
          title: "Vitamin B6:",
          body: " RDA: 2 mg per day for lactating women."),
      const Paragraph(
          title: "Folate (Vitamin B9):",
          body: " RDA: 500 mcg daily for lactating women."),
      const Paragraph(
          title: "Vitamin B12:",
          body: " RDA: 2.8 mcg per day for lactating women."),
      const Paragraph(
          title: "Calcium:",
          body: " RDA: 1,000 mg per day for lactating women."),
      const Paragraph(
          title: "Iron:", body: " RDA: 9 mg per day for lactating women."),
      const Paragraph(
          title: "Zinc:", body: " RDA: 12 mg per day for lactating women."),
      const Paragraph(
          title: "Copper:",
          body: " RDA: 1,300 mcg per day for lactating women."),
      const Paragraph(
          title: "Iodine:", body: " RDA: 290 mcg per day for lactating women."),
      const Remember(children: [
        'Lactating women need to maintain a well-balanced and nutritious diet to meet their increased nutrient needs during this period. However, individual requirements may vary, and it\'s always advisable to consult with a healthcare provider or a registered dietitian to tailor dietary recommendations to specific needs and circumstances.'
      ]),

      const SubTitleText(
          text:
              'Recommended Dietary Allowance (RDA) for macronutrients during lactation.'),
      const Paragraph(
          title: "",
          body:
              "The Recommended Dietary Allowance (RDA) for macronutrients during lactation can vary based on the mother\'s age, weight, activity level, and the amount of breast milk produced. However, here are general recommendations for macronutrient intake during lactation:"),
      const Paragraph(
          title: "Protein:",
          body:
              " The RDA for protein during lactation is higher than during pregnancy or when not pregnant. On average, lactating women are advised to consume about 71 grams of protein daily. Good protein sources include lean meats, poultry, fish, dairy products, eggs, legumes, and nuts."),
      const Paragraph(
          title: "Carbohydrates:",
          body:
              " Carbohydrate needs during lactation are similar to those during pregnancy. The RDA for carbohydrates is around 210 to 175 grams per day, depending on individual factors. Whole grains, fruits, vegetables, and legumes are excellent sources of carbohydrates."),
      const Paragraph(
          title: "Fats:",
          body:
              " The RDA for fats during lactation is approximately 44 to 55 grams per day. It\'s important to focus on healthy fats, such as those found in avocados, nuts, seeds, olive oil, and fatty fish. Omega-3 fatty acids, particularly DHA (docosahexaenoic acid), are crucial for developing the baby\'s nervous system and are found in fatty fish, flaxseeds, and walnuts."),
      const Paragraph(
          title: "Calories:",
          body:
              " Lactating women typically need additional calories to support milk production. On average, an extra 500 calories per day may be recommended, although individual needs can vary. It\'s essential to pay attention to hunger and fullness cues and adjust calorie intake accordingly."),
      const Remember(children: [
        'Lactating women must stay well-hydrated, so drinking plenty of water is also important. Additionally, it\'s recommended that lactating women continue to take prenatal vitamins, especially those containing iron and folic acid.',
        'Breastfeeding mothers must consult with their healthcare providers or a registered dietitian to determine their nutritional needs based on individual factors. Nutrient requirements can vary, and personalized advice can ensure that both the mother and baby receive adequate nutrition during this important period.'
      ]),

      CourseVideoPlayer(video: 'assets/videos/food_groups_en.mp4'),
      InkWell(
        onTap: () {
          openUrl(
              'https://www.youtube.com/watch?v=Z51bWG17m-Q&t=78s&ab_channel=ClickView');
        },
        child: const Text(
          'Credit - Youtube ClickView',
          style: TextStyle(color: Colors.blueAccent),
        ),
      ),
    ],
  ),
);
