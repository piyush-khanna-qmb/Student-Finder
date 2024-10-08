iswithinHome= false
iswithinSchool= false
lastRange= -1

loop 
{
    check -> iswithinHome , iswithinSchool;

    if(!iswithinHome && !iswithinSchool && lastRange!=0) {
        Notification("Your child is out of both ranges");
        lastRange= 0
        save(lastRange)
    }
    else if(!iswithinHome && iswithinSchool && lastRange!=1) {
        Notification("Your child is inside school premises");
        lastRange= 1
        save(lastRange)
    }
    else if(iswithinHome && !iswithinSchool && lastRange!=2) {
        Notification("Your child is out of ranges");
        lastRange= 2
        save(lastRange)
    }
}
