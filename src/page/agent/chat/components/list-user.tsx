import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';


const avatarUser="https://phunuvietnam.mediacdn.vn/media/news/33abffcedac43a654ac7f501856bf700/anh-profile-tiet-lo-g-ve-ban-1.jpg";
export default function ListUser (){
  const contacts = [
    { id: 1, name: "Marguerite Campbell", active: true, selected: true },
    { id: 2, name: "Katrina Winters", active: false, selected: false },
    { id: 3, name: "Miranda Valentine", active: true, selected: false },
    { id: 4, name: "Faulkner Benjamin", active: true, selected: false },
    { id: 5, name: "Marguerite Campbell", active: true, selected: false },
    { id: 6, name: "Katrina Winters", active: false, selected: false },
    { id: 7, name: "Miranda Valentine", active: true, selected: false },
    { id: 8, name: "Faulkner Benjamin", active: true, selected: false },
    { id: 9, name: "Marguerite Campbell", active: true, selected: false },
    { id: 10, name: "Katrina Winters", active: false, selected: false },
    { id: 11, name: "Miranda Valentine", active: true, selected: false },
    { id: 12, name: "Faulkner Benjamin", active: true, selected: false },
  ]

  return (
    <ScrollArea className="flex-1 overflow-y-auto">
      <div className="px-4 py-2">
        <h2 className="text-xs font-semibold text-gray-500 tracking-wider uppercase">Người dùng</h2>
        <div className="mt-2 space-y-1">
          { contacts.map( ( contact ) => (
            <div
              key={ contact.id }
              className={ cn(
                "flex items-center p-2 rounded-md cursor-pointer",
                contact.selected ? "bg-gray-100" : "hover:bg-gray-100",
              ) }
            >
              <div className="relative">
                <img
                  src={ avatarUser }
                  alt="Avatar"
                  className="rounded-full w-8 h-8 object-cover "
                />
                { contact.active && (
                  <span className="absolute bottom-0 right-0 block h-2 w-2 rounded-full bg-green-500 ring-1 ring-white" />
                ) }
              </div>
              <span className="ml-3 font-medium text-gray-700">
                { contact.name }
              </span>
            </div>
          ) ) }
        </div>
      </div>

    </ScrollArea>
  )
}
