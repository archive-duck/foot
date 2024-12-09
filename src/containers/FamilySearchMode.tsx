import { CardBody } from "@chakra-ui/react";
import Guide from "../components/Guide";
import ImagesStep1Img from "../assets/fs-images-1.png";
import OldStep1Img from "../assets/fs-old-1.png";
import NewStep1Img from "../assets/fs-new-1.png";

interface FamilySearchModeProps extends ModeProps {
  // more
}

const FamilySearchMode: React.FC<FamilySearchModeProps> = ({ tabURL }) => {
  
  let step1Img;
  if (tabURL.match(/.*\/records\/images\/image-details.*/)) {
    console.log(1);
    step1Img = ImagesStep1Img;
  } else if (tabURL.match(/.*\/ark:\/\d+\/.*view=explore/)) {
    console.log(2);
    step1Img = NewStep1Img;
  } else if (tabURL.match(/.*\/search\/film\/\d+.*/)) {
    console.log(3);
    step1Img = OldStep1Img;
  } else if (tabURL.match(/.*\/ark:\/\d+\/.*/)) {
    console.log(4);
    step1Img = OldStep1Img;
  }

  return (
    <>
      {step1Img ? (
        <CardBody>
          <Guide
            items={[
              {
                title: "Прилетіли",
                description:
                  "Ми на місці. На панелі зверху, знайдіть кнопку 'Завантажити всі скани'.",
                image: step1Img,
              },
              {
                title: "Кач/ка/ємо",
                description:
                  "По натисканню на кнопку миттєво розпочнеться завантаження всіх сканів цієї справи у вашу папку 'Завантаження'.",
              },
            ]}
          />
        </CardBody>
      ) : (
        <CardBody>
          <Guide
            items={[
              {
                title: "Майже прилетіли",
                description:
                  "Впевнено можу сказати, що ми вже вміємо завантажувати скани з цього сайту, залишилось тільки їх знайти. Перейдіть на сторінку перегляду архівної справи, наприклад: https://www.familysearch.org/ark:/61903/3:1:3QHJ-6QY7-RLS3",
              },
            ]}
          />
        </CardBody>
      )}
    </>
  );
};

export default FamilySearchMode;
