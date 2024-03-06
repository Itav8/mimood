// interface MoodFormProp {
//   feeling: string;
//   description: string;
//   // energyLevel?: EnergyLevels;
// }

interface Mood {
  id: string;
  // feeling: string;
  // description: string;
  // energyLevel: EnergyLevels;
  // createdDatetime: string;
  // onClose: () => void;
}

export const EditMoodForm = (props: Mood) => {
  return (
    <>
    <h1>EDIT</h1>
    <div>
      {props.id}
    </div>
    </>
  );
};
