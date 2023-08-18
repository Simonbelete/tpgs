import 'package:flutter/cupertino.dart';
import 'package:nea/models/course_model.dart';
import 'package:nea/widgets/bullet.dart';
import 'package:nea/widgets/course_body_image.dart';
import 'package:nea/widgets/keymessages.dart';
import 'package:nea/widgets/objectives.dart';
import 'package:nea/widgets/paragraph.dart';
import 'package:nea/widgets/sub_title_text.dart';

Course EN = Course(
  title: "HYGIENE AND SANITATION",
  coverImage: "assets/materials/images/sanittion_image.png",
  body: Column(
    crossAxisAlignment: CrossAxisAlignment.start,
    children: const [
      Objectives(children: ["Drinking water treatment and storage"]),
      CourseBodyImage(image: "assets/materials/images/21.png"),
      KeyMessages(children: [
        "Water retrieved from a safe water source can become contaminated during collection, transport, handling, and storage. Drinking contaminated water is one of the causes of illness and diarrheal disease.",
        Paragraph(title: "Drinking water can be disinfected by:", body: ""),
        "Boiling it or treating it with a chlorine to make it safe for drinking.",
        "If boiling, bring your water to a complete boil for at least 1 minute.",
        "To treat your water with chlorine, use one of the locally available treatment products such as waterguard and follow the instructions.",
        "Use a safe storage container when collecting water. Do not use leaves or other materials to cover the container as they may contaminate the water.",
        "if scooping water from a storage container, use a long-handled ladle so hands do not come into contact with water."
      ]),
      SubTitleText(text: "Food safety"),
      KeyMessages(children: [
        "Food safety measures in agriculture production Sources of pathogens on fresh produce",
        "Contaminated irrigation water",
        "Fresh or non-composted manure/fecal material",
        "Wild or domestic animals",
        "Handling by infected workers"
      ]),
      SubTitleText(text: "DURING PRODUCTION"),
      Bullet(children: [
        "A well-designed, healthy food production system",
        "Healthiest and safest food",
        "Right conditions",
        "Only use manure (whether from animals or people) that has been composted / matured",
        "Make sure that the animals have a healthy clean environment",
        "Another food safety issue is toxins (poisons) such as Aﬂ atoxin, produced by fungi in the natural environment",
        "Poor production, harvesting and storage contributes to food loss",
      ]),
      SubTitleText(text: "DURING HARVESTING"),
      Bullet(children: [
        "Harvest plant foods at their peak for the best quality",
        "Foods harvested too early or too late spoil faster",
        "Most foods taste better when they are properly matured",
      ]),
      SubTitleText(text: "DURING PROCESSING"),
      Bullet(children: [
        "Keep animals and insects away from the food processing area",
        "Grains, legumes, nuts and oilseeds need to be well dried and usually need their shells removed.",
        "Tubers, vegetables, fruits and like coconut and avocado should be cleaned whole first",
        "WASH (Water, Sanitation and Hygiene) is very important with vegetables and fruits. It is best to process these inside as they attract insects. The sweeter the food is the more it will attract insects when cutting it up (pumpkins, tomatoes, bananas, papayas etc.). Animal foods need care as germs can thrive in these products.",
      ]),
      SubTitleText(text: "DURING COOKING"),
      Bullet(children: [
        "Water, Sanitation and Health, and practice good, clean habits.",
        "Start with safe, healthy foods.",
        "Clean preparation environment: The kitchen and dining areas.",
        "Clean hands, and their clothes.",
        "Hand washing with soap and clean water should be done frequently.",
        "Air-dry hands and dishes instead.",
        "Kitchen towels if not well taken care of can be contaminated, air dry hands and dishes instead of using towels that are contaminated. Only use very clean towels for cleaning up.",
        "Keep food hot (or cold, depending on the recipe) until it is served on the plates the cooking and food preparation to match meal times.",
      ]),
      SubTitleText(text: "MAKING THE MOST OF LEFT-OVERS"),
      Bullet(children: [
        "Avoid leftovers by preparing only the amount of food you need",
        "Leftovers should be monitored properly",
        "Leftovers should be kept cool or cold in storage",
        "Avoid repeated heating and cooling of the same food",
      ]),
      SubTitleText(
        text: "Handwashing at critical moment",
        fontSize: 27.0,
      ),
      CourseBodyImage(image: "assets/materials/images/img_12.png"),
      KeyMessages(children: [
        "Wash your hands using running water and soap.",
        "Hand washing critical these 4 times",
        Bullet(children: [
          "Before preparing food for the baby",
          "After using the toilet",
          "Before feeding the baby or eating",
          "After changing the baby’s nappy and properly disposing oﬀ its feces in a pit latrine.",
        ]),
        "Thoroughly wash your child’ s hands and your own hands before mealtimes— before preparing food, before feeding your child, and before eating. Small children can get very dirty exploring their surroundings. There are many germs on the ground that can make them sick.",
        "Teach children to wash their hands.",
        "Have a handwashing station that has soap near the latrine for immediate use after visiting the toilet. A locally made tippy tap or basin and jug with water can be used."
      ]),
      SubTitleText(
        text: "STEPS TO THOROUGH HAND WASHING",
        fontSize: 16.0,
      ),
      CourseBodyImage(
        image: "assets/materials/images/hand_washing_steps.png",
        description:
            "Rinse your hands with warm water suitable for drinking. Dry your hands in the air or on a clean, hygienic cloth",
      ),
      SubTitleText(
        text: "How to make a tippy tap",
        fontSize: 27.0,
      ),
      Objectives(children: [
        "Share skills on how to make an easy to use handwashing station"
      ]),
      CourseBodyImage(image: "assets/materials/images/22.png"),
      KeyMessages(children: [
        "Tippy tap is used for a purpose of hand washing by using running water and soap.",
        "Build Tippy tap near the kitchen, and toilet.",
        "Its important to have Tippy taps near the Kitchen and toilet as it will be easy for people in the household to wash their hands with soap to during critical points.",
        "Make tippy tap by using simple materials available in your area.",
        "These materials are spade, 2 sticks which has V shape at the top, 2 sticks for holding a can, and for stepping, nails.",
      ]),
      SubTitleText(
        text: "Keeping children away from feaces",
        fontSize: 27.0,
      ),
      Objectives(children: [
        "Strengthen an understanding of the link between growth and hygiene"
      ]),
      CourseBodyImage(image: "assets/materials/images/23.png"),
      KeyMessages(children: [
        "Don’t defecate or throw feces in the bush this will be easily transmitted to the water or hands by touching contaminated grasses in the bush.",
        "Remember to build a permanent toilet in your household.",
        "Always use pit latrine or ﬂ ush toilet to defecate or urinate.",
        "Wash your hands properly with water and soap always after using the toilet.",
        "Use the toilet all the time to prevent feces and associated microbes from spreading.",
      ]),
      SubTitleText(
        text: "Protecting child’s play area (use of mat)",
        fontSize: 27.0,
      ),
      Objectives(children: [
        "Strengthen an understanding of the link between growth and hygiene"
      ]),
      CourseBodyImage(image: "assets/materials/images/24.png"),
      KeyMessages(children: [
        "Protect your children from eating dirty stuﬀ s from the ground to prevent them being sick from diarrhea, fever and vomiting.",
        "Parents /caregivers when busy doing other work in the garden or taking care of chickens make sure you leave your child in a clean place especially on the mat or clean cloth.",
        "When you use a mat make sure you fold the role inside out, this is to ensure the inside doesn’t get contaminated.",
        "Provide your child with toys to avoid picking of dirty things from the ground, like chicken poop and other animals.",
        "Make sure your child plays on the clean surface.",
      ]),
      SubTitleText(
        text: "Protecting child’s play area (breaking the fecal pathway)",
        fontSize: 27.0,
      ),
      Objectives(children: [
        "Strengthen an understanding of the link between growth and hygiene"
      ]),
      CourseBodyImage(image: "assets/materials/images/25.png"),
      KeyMessages(children: [
        "Dispose all children’s faecal matter into a latrine.",
        "If your child is old enough, let them use a potty (bought/made) and dispose this oﬀ in a toilet. Small children’s faecal matter is as dangerous as an adults faecal matter.",
        "Use a sanitary latrine, and teach your children how to use it. Using an improved sanitation facility helps prevent the spread of illness by preventing waste from coming into contact with water sources, open ﬁ elds, and flies.",
        "Keep your latrine clean to protect your environment, the water around your house, and your ﬁ elds. Ensure that the path way to the toilet is clear",
        "Provide your child with clean toys to avoid picking of dirty things from the ground, like chicken poop and other animals.",
        "Keep chicken droppings away from the reach of the children. A “ protective play space” keeps children away from animal feces and other dirty objects on the ground.",
        "Make sure your child plays on the clean surface.",
      ])
    ],
  ),
);
