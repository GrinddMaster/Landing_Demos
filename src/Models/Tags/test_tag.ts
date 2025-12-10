import { CommonMpSdk } from "@matterport/sdk/sdk";

export default async function testTag(mpSdk : CommonMpSdk) {
  const tagDesc = 
    {
      label: 'فرشه',
      anchorPosition: {
        x: -4.661306158839525,
        y: 1.5629415374275446,
        z: 0.7604189009914755,
      },
      stemVector: {
        x: 0.8382241800459577,
        y: 0.03193771723408253,
        z: 0.5443897557854646,
      },
    };
  

  mpSdk.Tag.add(tagDesc).then(([tagId] : string[]) => {
    mpSdk.Tag.editBillboard(tagId, {
      description: '[Test description link](https://www.youtube.com).',
    });
  });
}