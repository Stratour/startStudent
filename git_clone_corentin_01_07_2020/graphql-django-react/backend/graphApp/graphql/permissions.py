def user_permissions(info,**kwargs):
    user = info.context.user
    if user.is_authenticated:
        if kwargs.get("super"):
            if user.is_superuser:
                return user
            else:
                raise Exception("Need to be super to resolve data account")
                return False
        else:
            if kwargs.get("super") == False:
                raise Exception("Need to be a normal user to resolve data account")
                return False
        return user
    else:
        raise Exception("Need to be authenticated to resolve data account")
        return False