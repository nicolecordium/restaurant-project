exports.queryRestaurants = function(req, res, next){
	if ((req.query.minGrade) && (req.query.cuisine)) {
		
		return res.status(200).json({
			a: true
		});
	} else {
		return res.status(400).json({status: 400, message: 'minGrade and cuisine arguments are required.'});   
	}
}
