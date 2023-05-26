import 'package:flutter/cupertino.dart';
import 'package:nea/i18n/foods.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/food_grid_list.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
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
      const CourseBodyImage(
        image: "assets/materials/images/carbohydrates.png",
        description: "Sources of carbohydrates",
      ),
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
      const CourseBodyImage(
        image: "assets/materials/images/proteins.png",
        description: "Sources of proteins",
      ),
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
      const CourseBodyImage(
        image: "assets/materials/images/fats.png",
        description: "Sources of Fats",
      ),
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
      const CourseBodyImage(
        image: "assets/materials/images/vitamins.png",
        description: "Sources of Vitamins",
      ),
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
              "Minerals are solid, inorganic groups of compounds like essential building blocks of different types of cells. Essential minerals include iron, zinc, calcium, and iodine. For example, iron is part of red blood cells, which transport oxygen through the body. Zinc has many critical functions in the body, including the make-up of cells and body systems, including immune function."),
      const CourseBodyImage(
        image: "assets/materials/images/minerals.png",
        description: "Sources of Minerals",
      ),
      const SubTitleText(
        text: "Source of Minerals",
        fontSize: 14,
      ),
      FoodGridList(foods: mineralsFood),
      const Paragraph(
          title: "Nutrient requirements ",
          body:
              "refer to the different nutrients the body requires for energy, growth and repair, and protection from disease. They differ according to age, gender, physical activity, height, weight, and health status of the individual. ")
    ],
  ),
);
