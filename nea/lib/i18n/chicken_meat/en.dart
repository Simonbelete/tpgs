import 'package:flutter/material.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/screens/home_screen.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/remember.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  coverImage: 'assets/materials/images/206.png',
  title: 'CHICKEN MEAT',
  body: Column(crossAxisAlignment: CrossAxisAlignment.start, children: const [
    CourseBodyImage(image: 'assets/materials/images/203.jpg'),
    SubTitleText(
      text: "Health Benefits of Eating Chicken Meat",
    ),
    Paragraph(
        title: "",
        body:
            "Chicken is one of the most valued foods among people of all ages throughout the world. Not only it forms a crucial part of various culinary traditions, but it is also highly nutritious and delicious to taste. A great source of protein, chicken has been linked to a long list of health benefits :-"),
    SubTitleText(
      text: "Helps build muscles",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Chicken is one of the best non-vegetarian sources of protein. It is lean meat, which means that it contains more amount of proteins and less amount of fat. A 100g serving of roasted chicken offers 31g of protein, making it great for those who want to bulk up and build muscles."),
    SubTitleText(
      text: "Keeps your bones healthy",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Apart from protein, chicken is rich in minerals like phosphorus and calcium, which help keep bones in mint condition. Also, it has selenium known to cut the risk of arthritis."),
    SubTitleText(
      text: "Relieves stress",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Chicken has two nutrients that are great for reducing stress: tryptophan and Vitamin B5. Both have a calming effect on your body, making chicken an excellent option after a stressful day. Also, it tastes great and that too adds to its stress-releasing, happiness-inducing properties. Read our mega guide on how to deal with stress."),
    SubTitleText(
      text: "Reduces pre-menstrual syndrome symptoms",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Magnesium, a nutrient in chicken, helps soothe symptoms of pre-menstrual syndrome and fight the various mood changes a woman might experience during her periods. Here are more tips on dealing with PMS."),
    SubTitleText(
      text: "Helps boost testosterone levels",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Men should consume foods rich in zinc as it helps regulate testosterone levels and boost sperm production."),
    SubTitleText(
      text: "Boosts immunity",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Chicken soup has long been a home remedy for relieving colds, flu, and other common respiratory infections. The hot steam of chicken soup helps clear nasal and throat congestion while the thick fluid coats the throat to prevent invasion of respiratory linings by microbes to cause infection. A study evaluating this effect suggested that chicken soup inhibits the migration of neutrophils, a type of immune cell, thereby preventing inflammation during common infections and boosting immunity."),
    SubTitleText(
      text: "Promotes heart health",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Chicken, rich in vitamin B6, is important in preventing heart attacks. Vitamin B6 helps by lowering the levels of homocysteine, one of the key components linked to an increased risk of heart attack. Besides, chicken is also a good source of niacin which helps lower cholesterol, a risk factor for heart disease development. The American Heart Association also recommends chicken over red meat since it contains less saturated fats and is a good source of omega-3 fatty acids that exhibit beneficial cardiovascular effects."),
    SubTitleText(
      text: "Chicken preparation - Dry heat Method",
    ),
    Paragraph(
        title: "",
        body:
            "It is a cooking method without getting wet in the heating process. Higher temperatures than those used in moist heat cooking methods are employed in dry heat cooking, which has different effects on food & nutritive value and physical appearance. All heat-sensitive nutrients, except for most of the mineral elements, are affected to some extent by dry heat methods."),
    SubTitleText(text: "1. Roasting"),
    CourseBodyImage(image: 'assets/materials/images/206.png'),
    Paragraph(
        title: "",
        body:
            "Roasting is cooking in dry heat with the aid of fat or oil in an oven or on a spit. It is cooking meat or vegetables in the oven, basting them with hot fat to prevent drying and develop color and flavor. Radiant heat is the means of cooking when using a spit; oven roasting combines convection and radiation."),
    SubTitleText(text: "1.1 Oven Roasting"),
    Paragraph(
        title: "Oven Roasting ",
        body:
            "is cooking in an oven with the aid of fat and is applied to first-class meat, poultry, and certain vegetables."),
    Remember(
      title: "NOTE",
      children: [
        "To roast means to cook foods by surrounding them with hot, dry air, usually in an oven."
      ],
    ),
    SubTitleText(text: "1.2 Spit Roasting"),
    Paragraph(
        title: "Spit Roasting ",
        body:
            "is cooking by direct (radiated) heat with the aid of fat in the form of basting (the spit must constantly revolve). It is applied to first-quality joints of meat and game, and poultry. It is the original form of roasting, but because of many disadvantages in practice, oven roasting has developed in its place."),
    Remember(title: "NOTE", children: [
      "Cooking uncovered is essential to roasting. Covering holds in steam, changing the process from dry-heat to moist-heat cooking, such as braising or steaming.",
      "Meat is usually roasted on a rack (or if it is a rib roast, on its own natural rack of bones). The Rack prevents the meat from simmering in its own juices and fat. It also allows hot air to circulate all around the product.",
      "When roasting in a conventional oven, the cook should allow for uneven temperatures by occasionally changing the product’s position. The back of the oven is often hotter because heat is lost at the door."
    ]),
    SubTitleText(text: "Effects of Roasting"),
    Paragraph(
        title: "",
        body:
            "The initial heat of the oven, thus sealing it and preventing the escape of too many natural juices, seals the surface protein of the food. When the food is lightly browned, the oven temperature is reduced to cook the inside without hardening the surface."),
    SubTitleText(text: "Advantage of Roasting"),
    Bullet(children: [
      "Suitable quality joints of meat can be tenderized, and their flavor is well developed.",
      "Little attention is required while the meat roasts, except to pass the joint.",
      "Meat juices from the joint are used for gravy and enhance flavor.",
      "Ovens with transparent doors enable cooking to be observed.",
      "Minimal Fire risk.",
      "Skill and techniques can display to the customer in spit roasting.",
      "Both fuel and labor can be saved if other items are baked in the oven simultaneously.",
    ]),
    SubTitleText(text: "Time and Temperature Control"),
    Bullet(children: [
      "Ovens must be preheated",
      "Oven temperature and shelf settings in recipes must be followed.",
      "Shape, size, type, bone proportion, and quantity of food will affect the cooking time.",
      "Meat thermometers can be inserted to determine the exact temperature in the center of the joint.",
    ]),
    SubTitleText(text: "Safety"),
    Bullet(children: [
      "Roasting trays should be suitable if too small; basting becomes difficult and dangerous; if too large, fat in the tray will burn, spoiling the flavor of the meat and gravy.",
      "Handle hot roasting trays carefully at all times, using a thick, dry cloth.",
      "Ensure food is securely held before removing it from the roasting tray."
    ]),
    SubTitleText(text: "2. Frying"),
    CourseBodyImage(image: 'assets/materials/images/205.jpg'),
    Paragraph(
        title: "",
        body:
            "Frying is a quick, convenient, and popular cooking method involving high temperatures. Fats or oils are used."),
    Paragraph(
        title: "There are two types of frying:-",
        body: "Shallow frying and Deep frying"),
    SubTitleText(text: "2.1 Shallow frying"),
    Paragraph(
        title: "Shallow frying ",
        body:
            "is cooking food in a small quantity of pre-heated fat or oil in a shallow pan or on a flat surface (griddle plate)."),
    SubTitleText(
      text: "Methods of shallow frying",
      fontSize: 16.0,
    ),
    Paragraph(
        body: "",
        title:
            "There are four methods of frying using a shallow amount of fat or oil:"),
    Paragraph(
        title: "1. Shallow fry:-",
        body:
            "The cooking of food in a small amount of fat or oil in a frying pan. The presentation side of the food should be fried first as this side will have a better appearance because the fat is clean, then turned so that both sides are cooked and colored. This applies to small cuts of fish, meat, poultry, and small whole fish. Eggs, pancakes, and certain vegetables are cooked by this method."),
    Paragraph(
        title: "2. Sauté:-",
        body:
            "Tender cuts of meat and poultry are cooked in a sauté or frying pan. After the food is cooked on both sides, it is removed from the pan, the fat is discarded, and the pan is deglazed with stock or wines. This then forms an important part of the finished sauce."),
    Paragraph(
        title: "3. Griddle:-",
        body:
            "Foods cooked on a griddle (a solid metal plate): hamburgers, sausages, or sliced onions are placed on a lightly oiled preheated griddle and turned frequently during cooking,"),
    Paragraph(
        title: "STIR FRY:-",
        body:
            "Vegetables, strips of beef, chicken, etc., can be fast fried in a frying pan in a little fat or oil"),
    SubTitleText(text: "2.2 Deep Frying"),
    Paragraph(
        title: "",
        body:
            "This is the cooking of food in preheated deep oil or clarified fat. It involves the immersion of food in a pan of hot fat so that the food is covered by the fat while frying."),
    SubTitleText(
      text: "Preparing food for deep frying",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "Foods to be deep-fried, e.g., fish, meat, and fruit, should first be coated to prevent overcooking, the loss of juices from the food, and absorbing too much fat."),
    Paragraph(title: "Suitable protective coatings include:-", body: ""),
    Bullet(children: [
      "Beaten egg and breadcrumbs",
      "Seasoned flour and Beaten egg",
      "Flour, beaten egg, breadcrumbs",
      "Egg, flour, and milk batter",
    ]),
    Paragraph(
        title: "",
        body:
            "When the food is placed in the hot fat, the egg in the coating coagulates rapidly and thus forms. a protective layer around the food, which becomes crisp and golden brown. The food inside continues to cook by conduction and retains its flavor and texture."),
    Paragraph(
        title: "",
        body:
            "Fat should not be heated beyond the required temperature, as decomposition of the fat molecules occurs at high temperatures, and this leads to the release of free fatty acid, which affects the keeping qualities and flavor of the fat."),
    SubTitleText(
      text: "Methods for deep-frying",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "1. Conventional deep-fried ",
        body:
            "foods, with the exception of potatoes, are coated with milk and flour, egg and crumbs, batter, or pastry to:"),
    Bullet(children: [
      "Protect the surface of the food from intense heat.",
      "Prevent the escape of moisture and nutrients.",
      "Modify the rapid penetration of the intense heat.",
    ]),
    Paragraph(
        title: "",
        body:
            "The Food is carefully placed into deep preheated oil or fat, fried until cooked and golden brown, well-drained, and served."),
    Paragraph(
        title: "2. Partial deep-frying. ",
        body:
            "It is known as blanching and may be applied to chipped potatoes. The purpose is to cook before service and complete the cooking to order partly."),
    SubTitleText(
      text: "Effects of deep frying",
      fontSize: 16.0,
    ),
    Paragraph(
        title: "",
        body:
            "The effects of deep frying on coated items are that the surface is sealed by coagulation of the protein with the minimum absorption of fat and retains the nutrients and flavor of the food. But with uncoated items, the food absorbs a large amount of fat, thus affecting the texture and nutritional content."),
    Remember(title: "General Rules", children: [
      "Never overfill fryers with fat or oil or food to be cooked.",
      "The normal frying temperature is between 175 0 C and 195 0 C; this is indicated by a slight heat haze rising from the fat.",
      "Do not attempt to fry too much food at one time.",
      "Allow the fat to recover its heat before adding the next batch of food.",
      "Make sure the correct oil/fat ratio to food. If too much food is cooked in too little fat, even if the initial temperature of the fat is correct, the effect of a large amount of food will reduce the temperature drastically and spoil the food.",
      "Restrict holding time to a minimum-fried; foods soon lose their crispness.",
      "Oil and fat should be strained after use. Otherwise, the remaining food particles will burn when the fat is next heated, thus spoiling the appearance and flavor of the food.",
      "Always cover oil or fat when not in use to prevent oxidation."
    ])
  ]),
);
