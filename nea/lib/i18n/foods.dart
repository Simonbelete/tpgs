import 'package:nea/models/food_model.dart';
import 'egg/all.dart' as egg;

Map<String, Map<String, Food>> foodData = {
  'egg': {
    'en': egg.EN,
  },
};

Map<String, Map<String, Food>> carbohydratesFood = {
  'Banana': {
    'en':
        Food(coverImage: "assets/materials/foods/banana.png", title: "Banana"),
    'am': Food(coverImage: "assets/materials/foods/banana.png", title: "ሙዝ")
  },
  'Teff-Grain': {
    'en': Food(
        coverImage: "assets/materials/foods/Teff-Grain.jpg", title: "Teff"),
    'am': Food(coverImage: "assets/materials/foods/Teff-Grain.jpg", title: "ጤፍ")
  },
  'Corn': {
    'en': Food(coverImage: "assets/materials/foods/corn.png", title: "Corn"),
    'am': Food(coverImage: "assets/materials/foods/corn.png", title: "በቆሎ")
  },
  'Bread': {
    'en': Food(coverImage: "assets/materials/foods/bread.png", title: "Bread"),
    'am': Food(coverImage: "assets/materials/foods/bread.png", title: "ዳቦ")
  },
  'Beans': {
    'en': Food(coverImage: "assets/materials/foods/beans.png", title: "Beans"),
    'am': Food(coverImage: "assets/materials/foods/beans.png", title: "ባቄላ")
  },
  'potatoes': {
    'en': Food(
        coverImage: "assets/materials/foods/potatoes.png", title: "Potatoes"),
    'am': Food(coverImage: "assets/materials/foods/potatoes.png", title: "ድንች")
  }
};

Map<String, Map<String, Food>> vitaminsFood = {
  'Carrot': {
    'en': Food(coverImage: "assets/materials/foods/carot.png", title: "Carrot"),
    'am': Food(coverImage: "assets/materials/foods/carot.png", title: "ካሮት"),
  },
  'Tomato': {
    'en':
        Food(coverImage: "assets/materials/foods/tomato.png", title: "Tomato"),
    'am': Food(coverImage: "assets/materials/foods/tomato.png", title: "ቲማቲም")
  },
  'Watermelon': {
    'en': Food(
        coverImage: "assets/materials/foods/watermelon.png",
        title: "Watermelon"),
    'am':
        Food(coverImage: "assets/materials/foods/watermelon.png", title: "ሐብሐብ")
  },
  'Avocado': {
    'en': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Avocado"),
    'am': Food(coverImage: "assets/materials/foods/avocado.png", title: "አቮካዶ")
  },
  'Banana': {
    'en':
        Food(coverImage: "assets/materials/foods/banana.png", title: "Banana"),
    'am': Food(coverImage: "assets/materials/foods/banana.png", title: "ሙዝ")
  },
  'Orange': {
    'en':
        Food(coverImage: "assets/materials/foods/orange.png", title: "Orange"),
    'am': Food(coverImage: "assets/materials/foods/orange.png", title: "ብርቱካን")
  },
  'Pumpkin': {
    'en': Food(
        coverImage: "assets/materials/foods/pumpkin.png", title: "Pumpkin"),
    'am': Food(coverImage: "assets/materials/foods/pumpkin.png", title: "ዱባ")
  }
};

Map<String, Map<String, Food>> proteinsFood = {
  'Meat': {
    'en': Food(coverImage: "assets/materials/foods/raw_meat.png", title: "Meat")
  },
  'Fish': {
    'en': Food(coverImage: "assets/materials/foods/fish.png", title: "Fish")
  },
  'Egg': {
    'en': Food(coverImage: "assets/materials/foods/egg.png", title: "Egg")
  },
  'Milk': {
    'en': Food(coverImage: "assets/materials/foods/milk.png", title: "Milk")
  },
  'Yogurt': {
    'en': Food(
        coverImage: "assets/materials/foods/yogurt_food.png", title: "Yogurt")
  },
  'Chicken': {
    'en': Food(
        coverImage: "assets/materials/foods/raw_chicken.png", title: "Chicken")
  },
};

Map<String, Map<String, Food>> fatsFood = {
  'Cookingoil': {
    'en': Food(
        coverImage: "assets/materials/foods/vegetable_oil.png",
        title: "Cooking oil"),
    'am': Food(
        coverImage: "assets/materials/foods/vegetable_oil.png",
        title: "የማብሰያ ዘይት")
  },
  'Egg': {
    'en': Food(coverImage: "assets/materials/foods/egg.png", title: "Egg"),
    'am': Food(coverImage: "assets/materials/foods/egg.png", title: "እንቁላል")
  },
  'Avocado': {
    'en': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Avocado"),
    'am': Food(coverImage: "assets/materials/foods/avocado.png", title: "አቮካዶ")
  },
  'Milk': {
    'en': Food(coverImage: "assets/materials/foods/milk.png", title: "Milk"),
    'am': Food(coverImage: "assets/materials/foods/milk.png", title: "ወተት")
  },
  'Fish': {
    'en': Food(coverImage: "assets/materials/foods/fish.png", title: "Fish"),
    'am': Food(coverImage: "assets/materials/foods/fish.png", title: "ዓሳ")
  }
};

Map<String, Map<String, Food>> mineralsFood = {
  'Carrot': {
    'en': Food(coverImage: "assets/materials/foods/carot.png", title: "Carrot"),
    'am': Food(coverImage: "assets/materials/foods/carot.png", title: "ካሮት")
  },
  'Tomato': {
    'en':
        Food(coverImage: "assets/materials/foods/tomato.png", title: "Tomato"),
    'am': Food(coverImage: "assets/materials/foods/tomato.png", title: "ቲማቲም")
  },
  'Avocado': {
    'en': Food(
        coverImage: "assets/materials/foods/avocado.png", title: "Avocado"),
    'am': Food(coverImage: "assets/materials/foods/avocado.png", title: "አቮካዶ")
  },
  'Watermelon': {
    'en': Food(
        coverImage: "assets/materials/foods/watermelon.png",
        title: "Watermelon"),
    'am':
        Food(coverImage: "assets/materials/foods/watermelon.png", title: "ሐብሐብ")
  },
  'Banana': {
    'en':
        Food(coverImage: "assets/materials/foods/banana.png", title: "Banana"),
    'am': Food(coverImage: "assets/materials/foods/banana.png", title: "ሙዝ")
  },
  'Orange': {
    'en':
        Food(coverImage: "assets/materials/foods/orange.png", title: "Orange"),
    'am': Food(coverImage: "assets/materials/foods/orange.png", title: "ብርቱካን")
  },
  'Pumpkin': {
    'en': Food(
        coverImage: "assets/materials/foods/pumpkin.png", title: "Pumpkin"),
    'am': Food(coverImage: "assets/materials/foods/pumpkin.png", title: "ዱባ")
  }
};
