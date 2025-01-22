
/* 
FieldToIncludesInSearchResults helps you add more fields to the result templates. 
When setting imageField in this file, make sure the field is included in the FieldToIncludesInSearchResults array. 

The fields 'date', 'ytthumbnailurl', 'sysfiletype' should NOT be removed. 
*/

export const FieldToIncludesInSearchResults: string[] = [
  "sfanswer__c",
  "sfid",
  "sysfiletype",
  "date",
  "adimage",
  "ytthumbnailurl",
  "sfimage__c",
  "sfimage_url__c",
  "adspecial",
  "ytthumbnailurl",
  "ytvideoduration",
  "pdp", 
  "dictField", 
  "ec_images"
];

export const NoResultRecommendationConfig = {
  heading : "Popular Results",
  pipeline : "cmh-search-sandbox",
  searchHub : "default",
  NumberofResults : 6,
  imageField : "ec_images",
  excerptField : "ec_description",
 /*  showQuerySuggestion : true  */
}

export const SearchBarTitle = "Ready to shop?"

export const SpeechToText = false;

