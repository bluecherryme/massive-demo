select inc.id, state, inj.name injury, causes.name cause, a.name affectedArea 
from incidents inc
join injuries inj on inc.injuryid = inj.id
join affectedareas a on a.id =inj.affectedareaid
join causes on inc.causeid = causes.id;