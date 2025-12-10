import { CommonMpSdk } from "@matterport/sdk/sdk";

export default async function sdkPointer(mpSdk:CommonMpSdk) {
  mpSdk.Pointer.intersection
    .subscribe((hit) => {
      console.log('Intersection Position:', hit.position);
      console.log('Intersection normal:', hit.normal);
    })
}
{
  /*
    Turn the started.current variable in /Tour_View.jsx to *false*
    then use this took keep getting the position for the cursor in the tour.
    Use this when you want to determine where you want to put your tags.
    */
}
