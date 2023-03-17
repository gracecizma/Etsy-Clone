from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


def moreUsers():
    users = {
        User(email="pbullent0@webnode.com", username="clacknor0", password="9T4NKuIh"),
        User(email="nwrennall1@wordpress.org", username="rakerman1", password="j7fLVHP"),
        User(email="fyanyushkin2@ning.com", username="olarose2", password="rRhOhDhREeb9"),
        User(email="ytoms3@miitbeian.gov.cn", username="measeman3", password="m3j70PE"),
        User(email="jygoe4@who.int", username="rdargie4", password="2pBXC8Oz55r"),
        User(email="raysh5@livejournal.com", username="bjarmyn5", password="sFay2HC"),
        User(email="rgallety6@scribd.com", username="dfairley6", password="TQynB4zTb8"),
        User(email="btillot7@xing.com", username="blangstone7", password="OAUDmNEj67"),
        User(email="alowthian8@pinterest.com",username="twebborn8",password="SS0GPproPyL1",),
        User(email="ggloy9@pinterest.com", username="eelphick9", password="Sw8gBXXwhJy5"),
        User(email="rlenthalla@mediafire.com", username="cepsleya", password="YLHgeoS5J"),
        User(email="mtyrwhittb@rakuten.co.jp", username="alookerb", password="7QuZCXjGh"),
        User(email="fwahnerc@qq.com", username="sbodec", password="5EnYJq7zKxQ"),
        User(email="unattd@altervista.org", username="edillwayd", password="B7hEcKew1pX"),
        User(email="rrestille@hud.gov", username="gdiese", password="iKTxpWuJq"),
        User(email="dstrainf@amazon.co.jp", username="twrassellf", password="or9lOEutoHe"),
        User(email="kgoodwing@umich.edu", username="pwickwarthg", password="mSy7o5"),
        User(email="aparsallh@mac.com", username="tblanketth", password="Xh2LVvMBLR6"),
        User(email="gkeeblei@earthlink.net", username="fmynetti", password="UYyrcpFe6eQV"),
        User(email="rmartinhoj@state.gov", username="lbeavorsj", password="NCy8J0"),
        User(email="gweinbergk@irs.gov", username="evasyanink", password="9JZYnJ"),
        User(email="lwiffilll@nymag.com", username="ystroderl", password="89tkQ2F07"),
        User(email="rleportm@51.la", username="rjennensm", password="haLppHT"),
        User(email="malexanderssonn@barnesandnoble.com",username="swishartn",password="5G384qntcm6o"),
        User(email="kdavoreno@imageshack.us", username="croxbeeo", password="j9bOMBt9YNQ"),
        User(email="krubinowitchp@ihg.com", username="kgeraldip", password="w5Jw0Q"),
        User(email="kgreenheadq@usgs.gov", username="asitlintonq", password="i75NGYpgwHT"),
        User(email="cgauntlettr@google.com", username="bplayler", password="hAlMxmy9Ju"),
        User(email="amaragas@tripadvisor.com", username="rblaneys", password="NORKz3B3TB"),
    }
    for user in users:
        db.session.add(user)

    db.session.commit()
