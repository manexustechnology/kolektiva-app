import { Image } from "@chakra-ui/react";
import FilterBar from "./components/FilterBar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kolektiva",
  description: "Fractional Property",
};

export default function Home() {
  return (
    <div>
      <div className="flex flex-row items-center justify-center gap-2.5    bg-[#042F2E]">
        <div className="flex flex-row justify-start items-center p-16 px-3 gap-3  w-[1238px] max-w-[1238px]  bg-[#042F2E]">
          <div className="flex-col  max-w-[600px]">
            <p className=" text-4xl font-bold text-white leading-[40px]">
              Buy property ownership starting from IDR 250,000
            </p>
            <p className="  text-base font-normal text-[#14B8A6] leading-[18px]">
              Property investment that affordable and easy, start having your
              passive income now!
            </p>
          </div>
          <div className="ml-auto">
            <Image src="/images/Market_Img.png" alt="Building" />
          </div>
        </div>
      </div>
      <FilterBar />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
        odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla
        quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent
        mauris. Fusce nec tellus sed augue semper eleifend. Donec vitae dui nec
        justo cursus viverra. Vivamus laoreet diam eget nisi vehicula, non
        dignissim velit condimentum. Phasellus volutpat euismod magna. Nam id
        lectus ut purus interdum convallis at ut felis. Etiam at erat mi. Fusce
        fringilla ligula at nibh luctus, vel elementum ipsum viverra. Ut at est
        nec sapien sodales dictum. Duis sit amet odio nec mauris efficitur
        scelerisque et non risus. Pellentesque ut dui sed dolor fermentum
        eleifend. Sed nec mauris id erat facilisis suscipit non et eros.
        Curabitur sed urna in lorem vehicula lacinia. Morbi at orci ut lorem
        suscipit tempor. Suspendisse potenti. Quisque mollis tincidunt nunc, eu
        tempor odio vehicula nec. Mauris lacinia, lorem eu vehicula pretium,
        erat sem elementum arcu, a tincidunt orci ante ut mauris. Sed cursus
        libero ac nunc pretium scelerisque. Pellentesque convallis turpis nec
        urna cursus, vel pharetra mi suscipit. In ut nisl sem. Proin sit amet
        magna et odio pellentesque aliquam vel a eros. Suspendisse id est ut
        orci ultrices tincidunt. Duis consectetur eros vel erat malesuada, sit
        amet vehicula magna fermentum. Integer sed tellus id justo iaculis
        vehicula. Nam auctor malesuada fringilla. Integer at suscipit lorem.
        Etiam volutpat, lacus vel fermentum tincidunt, turpis nunc auctor eros,
        at condimentum nulla augue sed nulla. Sed hendrerit, purus id malesuada
        fermentum, libero odio feugiat justo, ut posuere orci sapien id nulla.
        Nam lacinia, est ac ultrices feugiat, magna ligula viverra libero, sit
        amet vehicula felis lectus nec lacus. Duis ultricies urna in dui
        gravida, et vulputate libero pellentesque. Cras at tincidunt lorem.
        Aenean sed erat vel erat tempor accumsan. Vivamus bibendum felis id
        ligula bibendum, at consequat sem iaculis. Nullam pretium metus ut dui
        convallis, ac tincidunt nisi dapibus. Vestibulum vel odio vel nulla
        vestibulum vehicula vel id mauris. Nullam ut vehicula elit. Curabitur
        vel magna augue. Nulla facilisi. Quisque suscipit neque et tortor
        sagittis, vel varius libero egestas. In auctor nulla et turpis
        facilisis, nec varius sem malesuada. Nulla id erat sed sapien gravida
        rhoncus. Phasellus sit amet vestibulum augue, nec tincidunt justo. In
        scelerisque lorem id magna efficitur elementum. Curabitur vestibulum
        urna sit amet ligula bibendum, eget auctor nulla sollicitudin. Nullam
        sit amet nisl purus. Donec non felis arcu. Morbi sagittis gravida metus,
        sit amet venenatis erat. Etiam lacinia urna id ligula dictum malesuada.
        Donec sagittis risus vel libero scelerisque, vel pharetra elit
        ullamcorper. Vivamus accumsan tortor non felis dignissim, ac dapibus
        enim elementum. Nullam fermentum ligula ac risus vehicula, id tincidunt
        nisl luctus. Maecenas condimentum purus et enim sagittis, ut efficitur
        metus varius. In convallis ligula sit amet quam eleifend pharetra.
        Nullam vel augue in felis scelerisque congue. Fusce suscipit mauris eu
        orci scelerisque volutpat. Cras aliquet orci vel justo tincidunt, a
        cursus lorem dapibus. Etiam et purus interdum, laoreet urna vitae,
        interdum ipsum. Aenean id erat a ante suscipit blandit nec id ipsum.
        Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere
        cubilia curae; Donec faucibus felis eu malesuada tincidunt. Vestibulum
        aliquam metus eget est euismod posuere. Mauris luctus augue id lectus
        facilisis, ac ullamcorper orci interdum. Sed auctor est in erat iaculis,
        ut interdum dolor cursus. Nulla facilisi. In in magna dictum, suscipit
        nisi in, lacinia arcu. Sed consectetur suscipit nibh non convallis.
        Nullam vehicula felis ut augue posuere, vel faucibus nunc laoreet. Ut at
        mi nec eros consequat cursus. In malesuada elit vitae felis vulputate,
        sed cursus libero feugiat. Fusce vehicula magna sed magna fermentum, sit
        amet tincidunt turpis euismod. Donec fringilla turpis euismod libero
        interdum interdum. Duis eu urna vel arcu tristique fermentum. In vel ex
        vehicula, pellentesque nulla nec, ornare sem. Suspendisse vitae nunc vel
        nunc luctus eleifend vel non lacus. Cras fringilla mi ac varius
        fringilla. Donec bibendum erat nec velit vulputate, in malesuada nulla
        hendrerit. In ornare leo eget ligula vulputate pretium. Nam vulputate ex
        sit amet nisi viverra, vel euismod dui cursus. Ut sed ante metus.
        Curabitur dapibus, turpis vel faucibus suscipit, sapien sapien laoreet
        risus, at elementum ligula metus vel odio. Vestibulum a rhoncus ex.
        Phasellus at dictum ipsum. Aliquam non urna sed dolor pellentesque
        facilisis eget sit amet dui. Sed egestas libero ut nisl vehicula, sed
        vulputate urna laoreet. Quisque aliquet, odio et venenatis fermentum,
        dolor ligula fermentum lorem, id consequat mauris lacus eu ligula. Donec
        in nulla id sem cursus hendrerit. Suspendisse in diam et lorem ultricies
        vestibulum. Aliquam erat volutpat. Integer vitae risus a purus sodales
        consectetur. Duis fringilla, ligula nec vehicula interdum, purus arcu
        pharetra sapien, et cursus est risus eu ligula. Sed nec suscipit mi, in
        efficitur libero. Fusce tincidunt odio et ante suscipit, at hendrerit
        libero eleifend. Aenean ac tellus vitae eros dictum dapibus. Nam eget
        arcu ut felis dictum consectetur eget a lectus. Proin in gravida libero.
        Integer sed mi sed sem pharetra gravida. Donec nec mauris varius, dictum
        nisl et, consectetur nulla. Pellentesque vehicula felis eget leo
        aliquam, id laoreet ante sodales. Nam dapibus massa in elit dapibus
        auctor. Nulla tristique suscipit nunc, ac tristique nulla ultrices vel.
        Suspendisse quis lacus et libero varius rhoncus. Nullam interdum, odio
        at elementum sagittis, odio lorem elementum nisl, nec venenatis libero
        ligula at lacus. Integer efficitur sem a odio posuere auctor. In ornare
        mi sed leo fringilla, non dictum ligula eleifend. Vivamus fringilla
        velit nec nisl hendrerit, eu ullamcorper lectus vehicula. Morbi
        tristique lectus a odio iaculis, id maximus sapien ultricies. Fusce
        feugiat mauris a turpis bibendum, non facilisis urna suscipit. Ut et
        tortor nec ante tempor vestibulum. Duis fringilla nulla vel lacus
        tincidunt, ut feugiat ante iaculis. Donec suscipit mi nec lorem
        sollicitudin, sit amet vehicula nisi pellentesque. Curabitur sit amet
        ligula ut libero posuere auctor sed a augue. Ut auctor augue eu nisl
        pharetra, eu consectetur ante congue. In hac habitasse platea dictumst.
        Sed volutpat lacinia suscipit. Suspendisse potenti. Nulla euismod odio
        vel turpis dictum, id ultrices ligula facilisis. Vivamus lacinia est sed
        tellus gravida congue. Integer gravida libero sit amet dictum
        sollicitudin. Donec non ligula id ligula maximus vulputate. In et nulla
        vel turpis vestibulum ultricies. Fusce bibendum magna ut risus efficitur
        congue. Vestibulum aliquet, mi non volutpat varius, purus dolor laoreet
        libero, a pharetra orci dolor vel magna. Integer gravida euismod
        bibendum. Aliquam fringilla libero ac libero dapibus, a sagittis leo
        suscipit. Phasellus gravida magna eget massa convallis, ut dapibus erat
        aliquam. Nulla facilisi. Donec eget ligula ac lacus venenatis ultricies.
        Mauris non odio nec justo interdum dictum nec at justo. Integer id
        ligula interdum, fringilla libero non, pharetra ligula. Quisque quis
        nunc ut est feugiat laoreet. In vitae risus feugiat, interdum purus eu,
        ultrices tortor. Donec lacinia orci nec augue suscipit cursus. Etiam
        tincidunt, ipsum at congue pellentesque, libero orci ultrices lectus,
        nec viverra eros nisl sit amet lacus. Integer imperdiet ultricies dui,
        nec dictum felis elementum sed. Mauris vitae nibh sit amet risus
        tincidunt vestibulum. Sed vulputate ligula eget augue tristique, nec
        dapibus sapien scelerisque. Nulla facilisi. Donec luctus, libero non
        blandit congue, dolor urna dictum orci, et luctus enim erat ac metus.
        Sed consectetur, ex in blandit vestibulum, nisl turpis maximus felis,
        eget pellentesque nunc nisi id justo. Quisque imperdiet libero at ex
        maximus, ut vestibulum nunc volutpat. Vivamus et suscipit dui.
        Suspendisse ultricies justo in mauris vehicula, ut volutpat sapien
        tempor. Nam maximus quam nec orci pharetra, ut laoreet purus dictum. In
        hac habitasse platea dictumst. Duis sodales magna nec lorem laoreet, non
        consectetur purus cursus. Donec nec odio vel enim vehicula lacinia.
        Aliquam erat volutpat. Ut auctor orci id erat elementum, nec dignissim
        est fermentum. Ut convallis turpis a justo viverra vehicula. In
        consequat urna eget purus dictum, id lobortis nulla blandit. Ut viverra
        ultricies ex, sit amet interdum ligula vestibulum eu. Cras id urna nec
        ligula elementum tincidunt. Pellentesque in est nec libero sodales
        hendrerit. Duis efficitur purus sed arcu laoreet suscipit. Vestibulum id
        justo orci. Ut posuere, est a elementum lobortis, libero erat volutpat
        ligula, vel interdum mi mauris nec mi. Nulla eu nisl odio. Aliquam vel
        libero sit amet arcu condimentum condimentum. Fusce eget diam eu eros
        posuere laoreet. Nulla sed auctor felis. Etiam mollis nisl vitae mauris
        congue, at scelerisque felis elementum. Aliquam erat volutpat. Sed non
        libero consectetur, feugiat lectus sed, volutpat odio. Donec in libero
        sit amet lorem laoreet pretiu
      </p>
    </div>
  );
}
