import React, { memo } from 'react';
import { Card, CardContent } from './ui/card';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';

const TestimonialCard = memo(({ testimonial }) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 bg-white">
      <CardContent className="p-6">
        <p className="text-gray-700 mb-6 italic leading-relaxed">
          "{testimonial.text}"
        </p>
        <div className="flex items-center space-x-3">
          <Avatar className="h-12 w-12">
            <AvatarImage 
              src={testimonial.image} 
              alt={testimonial.name}
              loading="lazy"
            />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-blue-700">{testimonial.name}</p>
            <p className="text-sm text-gray-600">{testimonial.position}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

export default TestimonialCard;
