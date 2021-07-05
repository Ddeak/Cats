# All about the Cats!

This application is a small demo app to demonstrate some of my frontend development skills, styles and processes.

It was built using Create-React-App, Typescript, Redux-toolkit, Material-UI and React-Testing-Library.
It uses the [Cat API](https://thecatapi.com/) in order to allow the user to upload cat images. It will display
the user's uploaded images and allow them to favourite, up/down vote, and track the image scores.

## Running

After cloning the repo, before running any script, you will need an API Key from the [Cat API](https://thecatapi.com/signup). Please do one of the following:

- set the `REACT_APP_CAT_API_TOKEN` environment variable on your system
- Or, open `src/app-config.ts` and replace the env-var reference with your API key:

```
export const TOKEN = "<Your API Key>";
```

After this, use the following scripts:

- `yarn` or `npm install`
- `yarn start` or `npm start`

- `yarn test` or `npm test`

## Developer Notes:

### IMPORTANT!

Currently on 04/07/21, some API call responses are not working as they are detailed within the documentation. The following errors exist:

- Deleting images does not actually delete them. The user is able to fetch the same image, (with a UUID name) after a successful delete request.
- Similar to images, Votes are not deleted after a successful delete request.
- When fetching images, despite uploading multiple images, the reponse from `/images` returns an array with a single image.

With the above in mind, there have been a few bugs in the application:

- Only the 'latest' vote will show fill in the Up/Down vote icon within the cat iamge.

  - Cat images can be up or downvoted indefinitely (Although this is useful for following the score.)

- Only one image will be displayed in the list.
  - The redux state code can be manipulated in order to display multiple:

```
return {
    catImages: [...catImages, ...catImages, ...catImages, ...catImages],
    loading: false,
};
```

### Development decisions / Potential improvements:

#### Redux

Due to the way that favourites and votes are linked to images via the `image_id` property, it made
sense to me grab all the data at the start and store it in app state. I chose to use redux over
alternatives due to it being a tool I am comfortable using.

However, due to the application interacting with the Cat API primarily, as well as the API requiring 2 requests when updating,
I believe a better implementation would be to use [React-Query](https://react-query.tanstack.com/overview) to handle
the data.

#### Material-UI

The decision to use Material was made in order to save time on styling the web app. Using material provides responsive support,
theme-management, and typography support.

### Testing philosophy:

I generally follow the advice in [this article](https://kentcdodds.com/blog/write-tests) by Kent C Dodds.
