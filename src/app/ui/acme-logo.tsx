import { GlobeAltIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/src/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row leading-none text-white`}
    >      
      <p className="text-[25px]">Natural Speech<br></br>    &<br></br> Hearing Clinic</p>
    </div>
  );
}
