export const photographerQuery = `*[_type == "photographer"][0]{
  name,
  email,
  instagram,
  agency->{
    name,
    email,
    phone
  }
}`;

export const landingImagesQuery = `*[_type == "landingImages"][0]{
  images[]{
    asset->{
      _id,
      url
    },
    alt
  }
}`;

export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  slug,
  mainImage{
    asset->{
      _id,
      url
    },
    alt
  }
}`;

export const portraitsQuery = `*[_type == "portrait"] | order(order asc) {
  _id,
  title,
  image{
    asset->{
      _id,
      url
    },
    alt
  }
}`;

export const singleProjectQuery = `*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  description,
  images[]{
    asset->{
      _id,
      url
    },
    alt
  }
}`;
