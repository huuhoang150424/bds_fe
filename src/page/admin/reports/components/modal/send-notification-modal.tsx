import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Send } from 'lucide-react';

interface SendNotificationModalProps {
  report: any;
}

export function SendNotificationModal({ report }: SendNotificationModalProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-red-500 hover:bg-red-600 text-white">
          <div className="flex items-center gap-[8px]">
            <Send className="mr-2 h-4 w-4" />
            <span>Gửi thông báo</span>
          </div>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[35%]">
        <DialogHeader>
          <DialogTitle>Gửi thông báo</DialogTitle>
          <DialogDescription>Gửi thông báo đến người báo cáo hoặc người bị báo cáo.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <RadioGroup defaultValue="reporter">
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reporter" id="reporter" />
              <Label htmlFor="reporter">Thông báo cho người báo cáo</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="reported" id="reported" />
              <Label htmlFor="reported">Thông báo cho người bị báo cáo</Label>
            </div>
          </RadioGroup>
          <Textarea placeholder="Nội dung thông báo..." className="min-h-[100px]" />
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Hủy</Button>
          </DialogClose>
          <Button
            variant="outline"
            className="bg-red-500 hover:bg-red-600 text-white"
            onClick={() => {}}
          >
            Gửi thông báo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}