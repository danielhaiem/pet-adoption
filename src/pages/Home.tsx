import { userAuthStore } from '../store';

type Props = {};

const Home = (props: Props) => {
  console.log('Home Page Rerender');
  const userStore = userAuthStore();
  const cookieExists = userAuthStore((state) => state.cookieExists);

  return (
    <div>
      <h1>
        Welcome{' '}
        {cookieExists
          ? `back ${userStore.token.fname} ${userStore.token.lname}`
          : 'to Woof Meow Adoption'}
      </h1>
      <p>
        Woof Meow Adoption is an online, searchable database of animals who need
        homes. Go ahead and sign up to adopt your new best friend today. Or go
        ahead and use our search to find your perfect match first.
      </p>
      <h4>Our mission</h4>
      <p>To use Internet technology and the resources it can generate to:</p>
      <p className="my-0">
        1. Increase public awareness of the availability of high-quality
        adoptable pets
      </p>
      <p className="my-0">
        2. Increase the overall effectiveness of pet adoption to the extent that
        the euthanasia of adoptable pets is eliminated
      </p>
      <p>3. Elevate the status of pets to that of family member</p>
      <p>
        From the comfort of their personal computers, pet lovers can search for
        a pet that best matches their needs.
      </p>
      <p>Woof Meow Adoption is updated DAILY.</p>
      <p>
        Woof Meow Adoption is made up of animal-care professionals and regular
        people volunteering fto maintain active and accurate homeless pet lists.
        Most animal welfare volunteers have “real jobs” by day. The success and
        the magnitude of this project is largely due to their tireless efforts
        to make a difference.
      </p>
      <h4>Disclaimer</h4>
      <p>
        Woof Meow Adoption is only a directory of homeless pets. No information
        in Woof Meow Adoption is guaranteed. Any pets found, adopted through, or
        listed in Woof Meow Adoption are the sole responsibility of the adopting
        party.
      </p>
      <p>
        Woof Meow Adoption accepts no responsiblity for any liability or for any
        injury or damages to any person or property caused by any listed animal,
        as well as any cause of action, claims, suits or demands whatsoever that
        may arise as a result of such injury or damage.
      </p>
    </div>
  );
};

export default Home;
