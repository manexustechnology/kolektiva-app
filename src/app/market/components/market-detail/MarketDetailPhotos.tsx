import { Button } from "@chakra-ui/react";
import { ImagesSquare } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";

const MarketDetailPhotos: React.FC = () => {
  return (
    <>
      <div className="flex gap-4 w-full">
        <div className="w-1/2 h-fit relative">
          <Image
            src='https://s3-alpha-sig.figma.com/img/042d/e5e6/68f01e55906f91c9987a6a0cb8b3c479?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oOM9pTN35ZAvvZpzhqK7LzmQ7RK8ykqc8YyT49Z2LIGn64xIJHFOwx4ADdA5Fv48w0yEDryQaTHmK7VCilLu9kgEiwm~Nbf0s~X00RV1O0sXvwlW1GYdEB1ReB9W-HnzMk-bLjkQfaQlBh4eDkwOk04PlqH3ZVV1xngRwQpxi1NHGDiE3GmaMTZojFbn2i8XL3nllKsIP~hwvNG7cNDcVVIFAzc~SSAucSGw3HnHg7lOahrRKT4l7booF~w8twvvWBUjG8iMm2Y3T8BLyLbxJG4oNchxbvRQwRztZzXr3XEryR1~BBUlpHc8WvLETP8o8~SRgNGWCTTclUAk4F9YFg__'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
          <div className="absolute bottom-4 left-4 z-10">
            <Button colorScheme="whiteAlpha" color='black' bgColor='white' rounded="full" fontWeight='medium' fontSize='md' display='flex' gap='1' alignItems='center'>
              <ImagesSquare size={16} />
              View all photos
            </Button>
          </div>
        </div>
        <div className="w-1/2 grid grid-cols-2 gap-4">
          <Image
            src='https://s3-alpha-sig.figma.com/img/e19d/35c9/214cfe1d735b5da2129f3b2a3aec0d96?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=d8XZPCxNaAeiVsvEGvODBTgDEZgq0v8Nm6uNfOVIYFwWvCLq6SDKNy6YJzVE50VDQFL0mvWdAa12TXslX4aZGwNPlCm4jQeVfZoqkNqbgWvJMyfBhYWpvZEYq5wLO8N9n-qcIhBlUlVPKa~It0QZD2Mga88av-zXDfEkN9XU2~AiHcc46D~NAOt3pVeuImBrrioLMtXXPR5syJYHAMy-jHv5wbnHGcPMvJETEsAWYJCUU6-mrWUpuhLMfuBc-P5PWnz-DiCHKkYgaMUwzcFiqva003src0k5uu63ziu5Orv1teWPK2RPVMyfCX4qLd8yfFwERPoaLMy6nPcrtUcEng__'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
          <Image
            src='https://s3-alpha-sig.figma.com/img/120e/ee65/b0d27ff02156522b00144e73d1088a05?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=Hnluh-sqQ7vl7KLSK~6LXM8WeR0Qm7JPVL1MvboC8nq8E4xOjrnLwrXQBMLd6yf21eaNVjGCdnA2vsJUIfAGXH5PKth7qt4qjIqL52EiLWTPxeMXXCIu7Q3HTSHDqPssbQkIjPjZOhVsBBddspLv9UlUbvx4dan4e~DMcNdfpv1Bdx1rciLs18daEgIUSaVJWsqMFZZvE7ImvPXj2Ku3tzMLjBp4OlgxdfvRIniJeHvpAjW8DlynCnVNzk7ZYHC9nIBWBNhR9rSFbiDa0eqt2-BmBIqTzNa3coWPXNnHBfg0q6vC29y6ZbEczGWxEAxmV2oVvlHR7xhExOUocPJ8og__'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
          <Image
            src='https://s3-alpha-sig.figma.com/img/37d4/0821/42df39fdab22f2748f75f87dd3a0e5fc?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=BhS3cYfz-MzT7JpBXDrBxPFvjhUWA0c4XMlEhBIKNKneWpgSjhXyvrEKIlLkeQLXdrX6QpUoZk1pppQ~mxgLveEyW7mlHmCqpthf3OBjE~krOY2rINwpHMUo1V7q8-nb7Pdkr4j5iyT3YS1NOFMavN7yn5q1pwdlZNw1THP4yL2pDrB00Hyl8W0o35Xebr9PhrzclalsmK9eIJGMb~Bl5k-HepCI7V7fg3U3A09n6rwWmZ0QAE3tfpKLrwGx61xbVTm2YGXNEKFzz-ZYhBsKI6j8sq~EENMzSwrOsyjA-xvl0yAmk6iSImRupzUetdzNYNV8qyk68ogpqTjPqECnmg__'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
          <Image
            src='https://s3-alpha-sig.figma.com/img/3828/a888/053222048659a875c31ae71b7e196989?Expires=1722816000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=pAZ2OC9CCK5aiRM1Vjhk85A-H62loLm2bR0Y8kSK-vYmT-2ml2FbYN0DqqnJgJe0EXQ6M0K0n49W3~sAWwgRb7VCgt67FYDfub8ArO827UH-05qEl8LrYJBZ-Vv4x03hhD6nDmL5rXiKNFPUR-a794IeY7XLs9oWox4Jmi43iCB5qgEmbPZuGWyVfwdS4IArK9GDAAkdf7BgS28WYlxHK3kuO0k1XZcmTAolF~3-hdjKqbplPUQGa2QGtITYk0sir1Jfyz9QbH~fOyPJCS4ijr7kvtXcCREMtR8rVXw8nE5zbB-ZuVL0Xlbg3KW15541NlmO7cb7kWS7f0C3cveBXw__'
            alt="Market detail photo"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }}
            className="aspect-square object-cover rounded-lg"
          />
        </div>
      </div>
    </>
  )
}

export default MarketDetailPhotos;